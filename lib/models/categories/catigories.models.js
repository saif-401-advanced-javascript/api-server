'use strict';

const categorySchema = require('./categories.schema');
const Mongo = require('../mongo');

class Categories extends Mongo {
  constructor() {
    super(categorySchema);
  }
}

module.exports = new Categories();
