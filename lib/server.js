'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const timeStamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const middle404 = require('../middleware/404');
const middle500 = require('../middleware/500');
const apiRoutes = require('../routes/api-v1');

// middleWare
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(timeStamp);
app.use(logger);
app.use('/api/v1', apiRoutes);
// app.use('/api/v1/products', productRouter);
// app.use('/api/v1/categories', catagoriesRouter);

app.use('*', middle404);
app.use(middle500);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('working', port);
    });
  },
};
