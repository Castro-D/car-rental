const car = require('../../entity/car');
const CarController = require('../carController');

const upploadMiddleware = {
  single: jest.fn()
};

const serviceMock = {
  save: jest.fn(),
  deleteCar: jest.fn(),
  getCarById: jest.fn(() => Promise.resolve({})),
  getAllCars: jest.fn(() => Promise.resolve([]))
}

const controller = new CarController(upploadMiddleware, serviceMock);

test('index renders index.html', async () => {
  const renderMock = jest.fn();
  await controller.index({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/view/home.html', { cars: [] })
});

test('create renders form.html', async () => {
  const renderMock = jest.fn();
  await controller.create({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('car/view/new-form.html');
});
