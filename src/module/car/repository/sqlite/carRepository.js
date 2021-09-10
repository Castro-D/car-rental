const AbstractCarRepository = require('../abstractCarRepository');

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    super();
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import('../../entity/car')} car
   * @returns {import('../../entity/car')}
   */
  save(car) {
    let id;
    const isUpdate = car.id;
    if (isUpdate) {
      const stmt = this.databaseAdapter.prepare(
        `UPDATE cars SET
        ${car.carImgUrl ? 'car_img_url = ?,' : ''}
        make = ?,
        model = ?,
        year = ?,
        kms = ?,
        color = ?,
        air_conditioning = ?,
        number_passengers = ?,
        transmission = ?
        WHERE id = ?`,
      );
      const params = [
        car.make,
        car.model,
        car.year,
        car.kms,
        car.color,
        car.airConditioning,
        car.numberPassengers,
        car.transmission,
        car.id,
      ];
      if (car.carImgUrl) {
        params.unshift(car.carImgUrl);
      }
      stmt.run(params);
    } else {
      const stmt = this.databaseAdapter.prepare(
        `INSERT INTO cars (
          make,
          model,
          year,
          kms,
          color,
          air_conditioning,
          number_passengers,
          transmission,
          car_img_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      );
      const result = stmt.run(
        car.make,
        car.model,
        car.year,
        car.kms,
        car.color,
        car.airConditioning,
        car.numberPassengers,
        car.transmission,
        car.carImgUrl,
      );
      id = result.lastInsertRowid;
    }
    return getCarbyId(id);
  }
};
