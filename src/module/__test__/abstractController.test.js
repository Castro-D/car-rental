const AbstractController = require('../abstractController');

test('an abstract class cant be instantiated', () => {
  try {
    new AbstractController();
  } catch (e) {
    expect(e.message).toBe('cant instantiate an abstract class.')
  }
});

test('a sub class from AbstractController can be instantiated', () => {
  const concreteController = class extends AbstractController{};
  expect(new concreteController()).toBeInstanceOf(AbstractController);
});