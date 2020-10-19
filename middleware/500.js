'use strict';

module.exports = (err, req, res, next) => {
  try {
    res.status(500).send('500/Server Error');
  } catch (e) {
    res.statusCode = 500;
  }
};
