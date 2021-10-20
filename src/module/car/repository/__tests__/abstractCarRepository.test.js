const AbstractCarRepository = require('../abstractCarRepository');

test('cant instantiate an abstract class', () => {
  let repoInstance;
  try {
    repoInstance = new AbstractCarRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  } finally {
    expect(repoInstance).toBeUndefined();
  }
});

test('a class that inherits from an abstract class can be instantiated', () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const repoInstance = new ConcreteRepository();

  expect(repoInstance).toBeInstanceOf(ConcreteRepository);
  expect(repoInstance).toBeInstanceOf(AbstractCarRepository);
});

test('calling methods without being implemented in a class throws error', async () => {
  const ConcreteRepo = class extends AbstractCarRepository{};
  const repoInstance = new ConcreteRepo();

  expect(repoInstance.save).rejects.toThrowError(Error);
  expect(repoInstance.deleteCar).rejects.toThrowError(Error);
  expect(repoInstance.getCarById).rejects.toThrowError(Error);
  expect(repoInstance.getAllCars).rejects.toThrowError(Error);
});