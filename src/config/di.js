const path = require('path');
const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const multer = require('multer');
const Sqlite3Database = require('better-sqlite3');
const { CarController, CarService, CarRepository } = require('../module/car/module');

function configureDatabaseAdapter() {
  return new Sqlite3Database('./data/database.db', { verbose: console.log });
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/img/cars');
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    DatabaseAdapter: factory(configureDatabaseAdapter),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('Multer'), get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('DatabaseAdapter')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  return container;
};
