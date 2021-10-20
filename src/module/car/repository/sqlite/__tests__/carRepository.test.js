const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const CarRepository = require('../carRepository');
const Car = require('../../../entity/car');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('saving a car generates an id', () => {
  const repository = new CarRepository(mockDb);
  const car = repository.save(new Car({
    make: 'make',
    model: 22,
    year: 22,
    kms: 22,
    color: 'black',
    airConditioning: 'yes',
    numberPassengers: 2,
    transmission: 'no',
    carImgUrl: 'example/img.jpg',
  }));
  expect(car.id).toEqual(1);
});

test('saving an existing car updates its info', () => {
  const repository = new CarRepository(mockDb);
  let car = repository.save(new Car({
    make: 'make',
    model: 22,
    year: 22,
    kms: 22,
    color: 'black',
    airConditioning: 'yes',
    numberPassengers: 2,
    transmission: 'no',
    carImgUrl: 'example/img.jpg',
  }));
  expect(car.id).toEqual(1);

  car = repository.save(
    new Car({
      id: 1,
      make: 'updated make',
      model: 22,
      year: 22,
      kms: 22,
      color: 'black',
      airConditioning: 'yes',
      numberPassengers: 2,
      transmission: 'no',
      carImgUrl: 'example/img.jpg',
    })
  )
  
  expect(car.id).toEqual(1);
  expect(car.make).toEqual('updated make')
});

test('deleteCar deletes a car', () => {
  const repository = new CarRepository(mockDb);
  const newCar = repository.save(
    new Car({
      make: 'updated make',
      model: 22,
      year: 22,
      kms: 22,
      color: 'black',
      airConditioning: 'yes',
      numberPassengers: 2,
      transmission: 'no',
      carImgUrl: 'example/img.jpg',
    })
  )
  
  expect(repository.deleteCar(newCar)).toBe(true);
});

test('getAllCars returns an array of car entities', () => {
  const repository = new CarRepository(mockDb);

  expect(repository.getAllCars()).toEqual([]);

  const newCar = repository.save(
    new Car({
      make: 'updated make',
      model: 22,
      year: 22,
      kms: 22,
      color: 'black',
      airConditioning: 'yes',
      numberPassengers: 2,
      transmission: 'no',
      carImgUrl: 'example/img.jpg',
    })
  );

  const newCar2 = repository.save(
    new Car({
      make: 'updated make',
      model: 22,
      year: 22,
      kms: 22,
      color: 'black',
      airConditioning: 'yes',
      numberPassengers: 2,
      transmission: 'no',
      carImgUrl: 'example/img.jpg',
    })
  );

  expect(repository.getAllCars()).toEqual([newCar, newCar2]);
});