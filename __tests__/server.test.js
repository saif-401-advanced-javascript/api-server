'use strict';
const { server } = require('../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('API Server Testing', () => {
  it('should response with 404 if not found', () => {
    return mockRequest.get('/foo').then((result) => {
      expect(result.status).toBe(404);
    });
  });
  it('should response with 200 on a correct route products', async () => {
    await mockRequest.get('/products').then((result) => {
      expect(result.status).toBe(200);
    });
  });
  it('should response with 200 on a correct route categories', async () => {
    await mockRequest.get('/categories').then((result) => {
      expect(result.status).toBe(200);
    });
  });

  it('should response with 404 if wrong method used', () => {
    return mockRequest.post('/').then((result) => {
      expect(result.status).toBe(404);
    });
  });
  it('should response with 201 when using post on products', async () => {
    await mockRequest.post('/products').then((result) => {
      expect(result.status).toBe(201);
    });
  });
  it('should response with 201 when using post on categories', async () => {
    await mockRequest.post('/categories').then((result) => {
      expect(result.status).toBe(201);
    });
  });
});
