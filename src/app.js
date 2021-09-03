const express = require('express');
const Database = require('better-sqlite3');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
const { fromDbToEntity, fromDataToEntity } = require('./mapper/carMapper');

const app = express();
const port = 8080;

const db = new Database('./data/database.db', { verbose: console.log });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img/cars');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

nunjucks.configure('src', {
  autoescape: true,
  express: app,
});

async function getAllCars() {
  const cars = db.prepare(
    `SELECT
      id,
      make,
      model,
      year,
      kms,
      color,
      air_conditioning,
      number_passengers,
      transmission,
      car_img_url

    FROM cars`,
  )
    .all();
  return cars.map((carData) => fromDbToEntity(carData));
}

async function index(req, res) {
  const cars = await getAllCars();
  res.render('view/home.html', { cars });
}

async function getCarbyId(id) {
  const car = db.prepare(
    `SELECT
    id,
    make,
    model,
    year,
    kms,
    color,
    air_conditioning,
    number_passengers,
    transmission, 
    car_img_url
    FROM cars WHERE id = ?`,
  ).get(id);
  return fromDbToEntity(car);
}

async function view(req, res) {
  const { id } = req.params;
  const car = await getCarbyId(id);
  res.render('view/car-info.html', { car });
}

function save(car) {
  let id;
  const isUpdate = car.id;
  if (isUpdate) {
    const stmt = db.prepare(
      `UPDATE cars SET
      ${car.carImgUrl ? 'car_img_url = ?,' : ''}
      make = ?,
      model = ?,
      year = ?,
      kms = ?,
      color = ?,
      air_conditioning = ?,
      number_passengers = ?,
      transmission = ?
      WHERE id = ?`,
    );
    const params = [
      car.make,
      car.model,
      car.year,
      car.kms,
      car.color,
      car.airConditioning,
      car.numberPassengers,
      car.transmission,
      car.id,
    ];
    if (car.carImgUrl) {
      params.unshift(car.carImgUrl);
    }
    stmt.run(params);
  } else {
    const stmt = db.prepare(
      `INSERT INTO cars (
        make,
        model,
        year,
        kms,
        color,
        air_conditioning,
        number_passengers,
        transmission,
        car_img_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    );
    const result = stmt.run(
      car.make,
      car.model,
      car.year,
      car.kms,
      car.color,
      car.airConditioning,
      car.numberPassengers,
      car.transmission,
      car.carImgUrl,
    );
    id = result.lastInsertRowid;
  }
  return getCarbyId(id);
}

function deleteCar(car) {
  db.prepare(
    `DELETE FROM cars WHERE id = ?
    `,
  ).run(car.id);
}

app.get('/', index);
app.get('/car/view/:id', view);
app.get('/car/create', (req, res) => {
  res.render('view/new-form.html');
});
app.post('/car/save', upload.single('image'), (req, res) => {
  const car = fromDataToEntity(req.body);
  if (req.file) {
    car.carImgUrl = req.file.path;
  }
  save(car);
  res.redirect('/');
});

app.get('/car/edit/:id', async (req, res) => {
  const { id } = req.params;
  const car = await getCarbyId(id);
  res.render('view/form.html', { car });
});

app.get('/car/delete/:id', async (req, res) => {
  const { id } = req.params;
  const car = await getCarbyId(id);
  deleteCar(car);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
