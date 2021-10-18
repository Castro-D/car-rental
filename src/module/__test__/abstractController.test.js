
const AbstractController = require('../abstractController');

test('an abstract class cant be instantiated', () => {
  try {
    new AbstractController();
  } catch (e) {
    expect(e.message).toBe('cant instantiate an abstract class.')
  }
});
