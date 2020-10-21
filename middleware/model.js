'use strict';

const categoriesModel = require('../lib/models/categories/catigories.models');
const productsModel = require('../lib/models/products/product.model');

module.exports = (req, res, next) => {
  const model = req.params.model;
  if (model == 'products') {
    req.model = productsModel;
  } else if (model == 'categories') {
    req.model = categoriesModel;
  }
  next();
};
