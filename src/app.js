const express = require('express');
const Database = require('better-sqlite3');
const nunjucks = require('nunjucks');
const { fromDbToEntity } = require('./mapper/carMapper');

const app = express();
const port = 8080;

const db = new Database('./data/database.db', { verbose: console.log });

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
  res.render('view/single-car.html', { car });
}

app.get('/', index);
app.get('/car/view/:id', view);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
