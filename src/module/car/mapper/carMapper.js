const Car = require('../entity/car');

/**
 * @returns Car
 */
function fromDbToEntity({
  id,
  make,
  model,
  year,
  kms,
  color,
  air_conditioning: airConditioning,
  number_passengers: numberPassengers,
  transmission,
  car_img_url: carImgUrl,
}) {
  return new Car({
    id,
    make,
    model,
    year,
    kms,
    color,
    airConditioning,
    numberPassengers,
    transmission,
    carImgUrl,
  });
}

function fromDataToEntity({
  id,
  make,
  model,
  year,
  kilometers: kms,
  color,
  'air-conditioning': airConditioning,
  passengers: numberPassengers,
  transmission,
}) {
  return new Car({
    id,
    make,
    model,
    year,
    kms,
    color,
    airConditioning,
    numberPassengers,
    transmission,
  });
}

module.exports = {
  fromDbToEntity,
  fromDataToEntity,
};
