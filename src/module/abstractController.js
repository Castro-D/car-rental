module.exports = class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new Error('cant instantiate an abstract class.');
    }
  }
};
