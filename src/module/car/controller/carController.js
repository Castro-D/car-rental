const AbstractController = require('../../abstractController');
const { fromDataToEntity } = require('../mapper/carMapper');

module.exports = class CarController extends AbstractController {
  /**
   * @param {import('../service/carService')} carService
   */
  constructor(upploadMiddleware, carService) {
    super();
    this.ROUTE_BASE = '/car';
    this.upploadMiddleware = upploadMiddleware;
    this.carService = carService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.upploadMiddleware.single('image'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  async create(req, res) {
    res.render('car/view/new-form.html');
  }

  async index(req, res) {
    try {
      const cars = await this.carService.getAllCars();
      res.render('car/view/home.html', { cars });
    } catch (e) {
      console.log(e);
    }
  }

  async view(req, res) {
    try {
      const { id } = req.params;
      const car = await this.carService.getCarById(id);
      res.render('car/view/car-info.html', { car });
    } catch (e) {
      console.log(e);
    }
  }

  async save(req, res) {
    try{
      const car = fromDataToEntity(req.body);
      if (req.file) {
        car.carImgUrl = req.file.path;
      }
      await this.carService.save(car)
      res.redirect('/');
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const car = await this.carService.getCarById(id);
      await this.carService.deleteCar(car);
      res.redirect('/');
    } catch (e) {
      console.log(e);
    }
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const car = await this.carService.getCarById(id);
      res.render('car/view/new-form.html', { car });
    } catch (e) {
      console.log(e);
    }
  }
};
