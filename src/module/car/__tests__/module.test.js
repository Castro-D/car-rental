const controller = {
  configureRoutes: jest.fn(),
}

const mockContainer = {
  get: jest.fn(() => controller)
}

const { init: initCarModule } = require('../module');

const mockApp = jest.fn();

test('init calls config routes', () => {
  initCarModule(mockApp, mockContainer);

  expect(mockContainer.get).toHaveBeenCalledTimes(1);
  expect(mockContainer.get).toHaveBeenCalledWith('CarController');
  expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
  expect(controller.configureRoutes).toHaveBeenCalledWith(mockApp);
});