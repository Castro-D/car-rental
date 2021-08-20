module.exports = class Car {
  constructor({
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
  }) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.kms = kms;
    this.color = color;
    this.airConditioning = airConditioning;
    this.numberPassengers = numberPassengers;
    this.transmission = transmission;
    this.carImgUrl = carImgUrl;
  }
};
