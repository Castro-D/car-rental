const express = require('express');
const Database = require('better-sqlite3');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
const { fromDbToEntity, fromDataToEntity } = require('./module/car/mapper/carMapper');

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

nunjucks.configure('src/module', {
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
  res.render('car/view/home.html', { cars });
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
  res.render('car/view/car-info.html', { car });
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
  res.render('car/view/new-form.html');
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
  res.render('car/view/new-form.html', { car });
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
