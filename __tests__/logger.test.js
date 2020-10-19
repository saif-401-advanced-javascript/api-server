'use strict';
const logger = require('../middleware/logger');

describe('Logger Middleware', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  const req = {};
  const res = {};
  const next = jest.fn();
  it('log the output correctly', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('move to the next middleware', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
