'use strict';

const productsSchema = require('./product.schema');
const productCollection = require('./products.collection');

class Products extends productCollection {
  constructor() {
    super(productsSchema);
  }
}

module.exports = new Products();
