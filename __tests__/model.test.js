'use strict';

const middleModel = require('../middleware/model');
const productCollection = require('../lib/models/products/products.collection');
const cateCollection = require('../lib/models/categories/categories.collection');

describe('Model Middleware Test', () => {
  it('if products was passed in the call model should be productsModel ', () => {
    const req = {
      params: {
        model: 'products',
      },
    };
    const res = {};
    const next = jest.fn();

    middleModel(req, res, next);
    expect(req.model).toBeInstanceOf(productCollection);
  });

  it('if categories was passed in the call model should be categoriesModel ', () => {
    const req = {
      params: {
        model: 'categories',
      },
    };
    const res = {};
    const next = jest.fn();

    middleModel(req, res, next);
    expect(req.model).toBeInstanceOf(cateCollection);
  });

  it('should response with 500 if anything else was passed ', () => {
    const req = {
      params: {
        model: 'anything',
      },
    };
    const res = {};
    const next = jest.fn();

    middleModel(req, res, next);
    expect(req.model).toBeUndefined();
  });
});
