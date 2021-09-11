/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new Error('cant instantiate an abstract class');
    }
  }

  /**
   * @param {import('../entity/car')} car
   * @returns {import('../entity/car')}
   */
  async save(car) {
    throw new Error('method not implemented');
  }

  async deleteCar(id) {
    throw new Error('method not implemented');
  }

  /**
   * @returns {import('../entity/car')}
   */
  async getCarById(id) {
    throw new Error('method not implemented');
  }

  /**
   * @returns {Array<import('../entity/car')>}
   */
  async getAllCars() {
    throw new Error('method not implemented');
  }
};
