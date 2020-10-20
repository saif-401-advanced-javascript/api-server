'use strict';
const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
require('dotenv').config();
const mockRequest = supergoose(server);

const sendObjectPro = {
  category: 'bags',
  name: 'long bag',
  display_name: 'black bag',
  description: 'a vey long bag',
};

const sendObjectCate = {
  name: 'long bag',
  display_name: 'black bag',
  description: 'a vey long bag',
};

describe('API Server Testing', () => {
  it('should return an empty array if the categories/products are empty', async () => {
    const products = await mockRequest.get('/api/v1/products');
    const categories = await mockRequest.get('/api/v1/categories');
    expect(products.body.results).toEqual([]);
    expect(categories.body.results).toEqual([]);
  });
  it('should response with 404 if not found', () => {
    return mockRequest.get('/api/v1/foo').then((result) => {
      expect(result.status).toBe(404);
    });
  });
  it('should response with 200 on a correct route products', async () => {
    await mockRequest.get('/api/v1/products').then((result) => {
      expect(result.status).toBe(200);
    });
  });
  it('should response with 200 on a correct route categories', async () => {
    await mockRequest.get('/api/v1/categories').then((result) => {
      expect(result.status).toBe(200);
    });
  });

  it('should response with 404 if wrong method used', () => {
    return mockRequest.post('/').then((result) => {
      expect(result.status).toBe(404);
    });
  });
  it('should response with 201 when using post on products/data returned', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(sendObjectPro)
      .then((result) => {
        expect(result.status).toBe(201);
      });
  });
  it('should response with 201 when using post on categories', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(sendObjectCate)
      .then((result) => {
        expect(result.status).toBe(201);
      });
  });

  it('should return data if it was called with get() products/cate', async () => {
    const saved = await mockRequest
      .post('/api/v1/products')
      .send(sendObjectPro);
    const record = await mockRequest.get(`/api/v1/products/${saved.body._id}`);
    const arrivedRecord = record.body[0];
    Object.keys(arrivedRecord).forEach((key) => {
      expect(saved.body[key]).toEqual(arrivedRecord[key]);
    });
  });

  it('should return a message and the count should be 1 if deleted', async () => {
    const saved = await mockRequest
      .post('/api/v1/products')
      .send(sendObjectPro);
    const record = await mockRequest.delete(
      `/api/v1/products/${saved.body._id}`
    );
    const deletedItem = record.body.record;
    Object.keys(deletedItem).forEach((key) => {
      expect(saved.body[key]).toEqual(deletedItem[key]);
    });
  });
  it('should response to 500 if the id in deleting was wrong', () => {
    return mockRequest
      .delete(`/api/v1/products/5f8ee9b0c7977f3`)
      .then((data) => {
        expect(data.status).toBe(500);
      });
  });

  it('should update the same record of the passed id', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(sendObjectCate)
      .then(async (result) => {
        console.log('result', result.body);
        const updatedItem = await mockRequest
          .put(`/api/v1/categories/${result.body._id}`)
          .send({
            name: 'Bag2222',
            display_name: 'Black Bag',
            description: 'a well desinged bag',
          });
        expect(updatedItem.body.record._id).toEqual(result.body._id);
      });
  });
});
