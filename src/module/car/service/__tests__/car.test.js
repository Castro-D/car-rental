const CarService = require('../carService');
const Car = require('../../entity/car');

const repoMock = {
  save: jest.fn(),
  deleteCar: jest.fn(),
  getCarById: jest.fn(),
  getAllCars: jest.fn(),
}

const service = new CarService(repoMock);

test('save calls repo once', async () => {
  service.save({});
  
  expect(repoMock.save).toHaveBeenCalledTimes(1);
});

test('delete calls repo once', async () => {
  service.deleteCar({});
  
  expect(repoMock.deleteCar).toHaveBeenCalledTimes(1);
});

test('getCarById calls repo once', async () => {
  service.getCarById(1);
  
  expect(repoMock.getCarById).toHaveBeenCalledTimes(1);
});

test('getAllCars calls repo once', async () => {
  service.getAllCars();
  
  expect(repoMock.getAllCars).toHaveBeenCalledTimes(1);
});