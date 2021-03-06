require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di');
const { init: initCarModule } = require('./module/car/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection();
initCarModule(app, container);

/**
 * @type {import('./module/car/controller/carController')} carController
 */
const carController = container.get('CarController');
app.get('/', carController.index.bind(carController));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
