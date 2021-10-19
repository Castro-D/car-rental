const Car = require('../../entity/car');
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

global.console = {
  log: jest.fn()
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

test('save method edits a car when an id is given', async () => {
  const redirectMock = jest.fn();
  const FAKE_IMG_URL = 'example/car.jpg';
  const bodyMock = new Car({
    id: 1,
    make: undefined,
    model: undefined,
    year: undefined,
    kms: undefined,
    color: undefined,
    airConditioning: undefined,
    numberPassengers: undefined,
    transmission: undefined,
    carImgUrl: FAKE_IMG_URL,
  });

  await controller.save({ body: bodyMock, file: { path: FAKE_IMG_URL } }, { redirect: redirectMock });
  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/');
});

test('save creates a car when id is not given', async () => {
  serviceMock.save.mockReset();
  const redirectMock = jest.fn();
  const FAKE_IMG_URL = 'example/car.jpg';
  const bodyMock = new Car({
    make: undefined,
    model: undefined,
    year: undefined,
    kms: undefined,
    color: undefined,
    airConditioning: undefined,
    numberPassengers: undefined,
    transmission: undefined,
    carImgUrl: 'example/car.jpg',
  });
  await controller.save({ body: bodyMock, file: { path: FAKE_IMG_URL } }, { redirect: redirectMock })
  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/');
});

test('delete method calls service with id', async () => {
  const FAKE_CAR = new Car({ id: 1 });
  serviceMock.getCarById.mockImplementationOnce(() => Promise.resolve(FAKE_CAR));
  const redirectMock = jest.fn();

  await controller.delete({ params: { id: 1 } }, { redirect: redirectMock });

  expect(serviceMock.deleteCar).toHaveBeenCalledTimes(1);
  expect(serviceMock.deleteCar).toHaveBeenCalledWith(FAKE_CAR);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenLastCalledWith('/');
});

test('configure routes properly', async () => {
  const app = {
    get: jest.fn(),
    post: jest.fn()
  }
  controller.configureRoutes(app);
});

test('view renders car', async () => {
  const MOCK_ID = 1;
  const renderMock = jest.fn();
  await controller.view({ params: { id: MOCK_ID } }, { render: renderMock });

  expect(serviceMock.getCarById).toHaveBeenCalledWith(MOCK_ID);
  expect(renderMock).toHaveBeenCalledWith('car/view/car-info.html', { car: {} })
});

test('view displays error on exception', async () => {
  serviceMock.getCarById.mockImplementationOnce(() => { throw Error('testing') });
  await controller.view({ params: { id: 1 }}, {});

  expect(global.console.log).toHaveBeenCalledTimes(1);
});

test('save displays error on exception', async () => {
  global.console.log.mockReset();
  const bodyMock = new Car({
    make: undefined,
    model: undefined,
    year: undefined,
    kms: undefined,
    color: undefined,
    airConditioning: undefined,
    numberPassengers: undefined,
    transmission: undefined,
    carImgUrl: 'example/car.jpg',
  });
  const redirectMock = jest.fn();
  serviceMock.save.mockImplementationOnce(() => { throw Error('testing') });
  await controller.save({ body: bodyMock, file: { path: 'example/car.jpg' } }, { redirect: redirectMock });

  expect(global.console.log).toHaveBeenCalledTimes(1);
});

test('delete displays error on exception', async () => {
  global.console.log.mockReset();
  const redirectMock = jest.fn();
  serviceMock.deleteCar.mockImplementationOnce(() => { throw Error('testing') });
  await controller.delete({ params: { id: 1 }}, { redirect: redirectMock });
  expect(global.console.log).toHaveBeenCalledTimes(1);
});

test('index displays error on exception', async () => {
  global.console.log.mockReset();
  serviceMock.getAllCars.mockImplementationOnce(() => { throw Error('tesing') });
  await controller.index({}, {});
  expect(global.console.log).toHaveBeenCalledTimes(1);
});