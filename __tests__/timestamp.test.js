'use strict';

const timestamp = require('../middleware/timestamp');

describe('Time Stamp Middleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();
  it('should move to the next middleware', () => {
    timestamp(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('should add a new property to req object', () => {
    timestamp(req, res, next);
    expect(req.requestTime).toBeDefined();
  });
});
