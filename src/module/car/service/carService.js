/**
 * @typedef {import('../repository/abstractCarRepository')} AbstractCarRepository
 */

module.exports = class Service {
  /**
   * @param {AbstractCarRepository} carRepository
   */
  constructor(carRepository) {
    this.carRepository = carRepository;
  }

  /**
   * @param {import('../entity/car')} car
   */
  async save(car) {
    return this.carRepository.save(car);
  }

  /**
   * @param {import('../entity/car')}
   */
  async deleteCar(car) {
    return this.carRepository.deleteCar(car);
  }

  async getCarById(id) {
    return this.carRepository.getCarById(id);
  }

  async getAllCars() {
    return this.carRepository.getAllCars();
  }
};
