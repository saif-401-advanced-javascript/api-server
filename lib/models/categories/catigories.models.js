'use strict';

const catagoriesSchema = require('./categories.schema');
const catagoriesCollection = require('./categories.collection');

class Catagories extends catagoriesCollection {
  constructor() {
    super(catagoriesSchema);
  }
}

module.exports = new Catagories();
