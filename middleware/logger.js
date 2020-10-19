'use strict';

module.exports = (req, res, next) => {
  console.log(`
        Requested Path : ${req.path}
        Requested method : ${req.method}
        Requested Time : ${req.requestTime}
    `);
  next();
};
