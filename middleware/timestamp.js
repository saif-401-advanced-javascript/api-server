'use strict';
module.exports = (req, res, next) => {
  const currentDate = new Date();

  let dateTime = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()} @ ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  req.requestTime = dateTime;
  next();
};
