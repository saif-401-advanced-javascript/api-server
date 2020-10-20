require('dotenv').config();
const server = require('./lib/server');
const mongoose = require('mongoose');
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const PORT = process.env.PORT;

mongoose
  .connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.start(PORT))
  .catch((error) => console.error(error.message));
