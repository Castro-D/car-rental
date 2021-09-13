const express = require('express');
const Database = require('better-sqlite3');
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
const { fromDbToEntity, fromDataToEntity } = require('./module/car/mapper/carMapper');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

app.get('/', index);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
