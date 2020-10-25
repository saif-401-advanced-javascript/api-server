'use strict';

const productsSchema = require('./product.schema');
const Mongo = require('../mongo');

class Products extends Mongo {
  constructor() {
    super(productsSchema);
  }
}

module.exports = new Products();
