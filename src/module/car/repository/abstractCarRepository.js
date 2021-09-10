module.exports = class AbstractCarRepository {
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new Error('cant instantiate an abstract class');
    }
  }
};
