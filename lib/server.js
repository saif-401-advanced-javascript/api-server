'use strict';

const express = require('express');
const app = express();
const timeStamp = require('../middleware/timestamp');
const logger = require('../middleware/logger');
const middle404 = require('../middleware/404');
const middle500 = require('../middleware/500');
//
let AllProductsArray = [];
let AllCatagoriesArray = [];

// middleWare
app.use(express.json());
app.use(timeStamp);
app.use(logger);

// Routes
app.get('/', mainPageHandler);
// Products Routes
app.get('/products', getAllHandler);
app.post('/products', insertNewHandler);
app.get('/products/:id', getOneHandler);
app.put('/products/:id', updateOneHandler);
app.delete('/products/:id', deleteOneHandler);
// Catagories Routs
app.get('/categories', getAllHandler);
app.post('/categories', insertNewHandler);
app.get('/categories/:id', getOneHandler);
app.put('/categories/:id', updateOneHandler);
app.delete('/categories/:id', deleteOneHandler);
// Bad route to test 500 middleware

app.get('/test', (req, res) => {
  // res.status(500);
  throw new Error('Bad route');
});

// Functions

function mainPageHandler(req, res) {
  res.status(200).json({
    working: 'welcome stranger',
  });
}

function getAllHandler(req, res) {
  if (req.route.path.includes('products')) {
    res.status(200);
    res.json({
      count: AllProductsArray.length,
      results: AllProductsArray,
    });
  } else if (req.route.path.includes('categories')) {
    res.status(200);
    res.json({
      count: AllCatagoriesArray.length,
      results: AllCatagoriesArray,
    });
  }
}

function getOneHandler(req, res) {
  const id = req.params.id;
  if (req.route.path.includes('products')) {
    const requiredItem = AllProductsArray.filter((item) => item._id == id);
    res.status(200);
    res.send(requiredItem[0]);
  } else if (req.route.path.includes('categories')) {
    const requiredItem = AllCatagoriesArray.filter((item) => item._id == id);
    res.status(200);
    res.send(requiredItem[0]);
  }
}

function insertNewHandler(req, res) {
  if (req.route.path.includes('products')) {
    const { category, name, display_name, description } = req.body;
    const newDocument = { category, name, display_name, description };
    newDocument._id = AllProductsArray.length + 1;
    AllProductsArray.push(newDocument);
    res.status(201);
    res.json({
      message: 'You just added this product to db',
      product: newDocument,
    });
  } else if (req.route.path.includes('categories')) {
    const { name, display_name, description } = req.body;
    const newDocument = { name, display_name, description };
    newDocument._id = AllCatagoriesArray.length + 1;
    AllCatagoriesArray.push(newDocument);
    res.status(201);
    res.json({
      message: 'You just added this product to db',
      product: newDocument,
    });
  }
}

function updateOneHandler(req, res) {
  const id = req.params.id;
  if (req.route.path.includes('products')) {
    const { category, name, display_name, description } = req.body;
    category ? category : AllProductsArray[id - 1].category;
    name ? name : AllProductsArray[id - 1].name;
    display_name ? display_name : AllProductsArray[id - 1].display_name;
    description ? description : AllProductsArray[id - 1].description;
    AllProductsArray[id - 1].category = category;
    AllProductsArray[id - 1].name = name;
    AllProductsArray[id - 1].display_name = display_name;
    AllProductsArray[id - 1].description = description;
    AllProductsArray[id - 1]._id = id;
    res.status(200);
    res.json({
      message: 'You just Updated this product',
      product: AllProductsArray[id - 1],
    });
  } else if (req.route.path.includes('categories')) {
    const { name, display_name, description } = req.body;
    name ? name : AllCatagoriesArray[id - 1].name;
    display_name ? display_name : AllCatagoriesArray[id - 1].display_name;
    description ? description : AllCatagoriesArray[id - 1].description;
    AllCatagoriesArray[id - 1].name = name;
    AllCatagoriesArray[id - 1].display_name = display_name;
    AllCatagoriesArray[id - 1].description = description;
    AllCatagoriesArray[id - 1]._id = id;
    res.status(200);
    res.json({
      message: 'You just Updated this product',
      product: AllCatagoriesArray[id - 1],
    });
  }
}

function deleteOneHandler(req, res) {
  const id = req.params.id;
  if (req.route.path.includes('products')) {
    const deletedItem = AllProductsArray.filter((item) => item._id == id);
    AllProductsArray.splice(id - 1, 1);
    res.status(200);
    res.json({
      message: 'You just Deleted this product',
      product: deletedItem,
    });
  } else if (req.route.path.includes('categories')) {
    const deletedItem = AllCatagoriesArray.filter((item) => item._id == id);
    AllCatagoriesArray.splice(id - 1, 1);
    res.status(200);
    res.json({
      message: 'You just Deleted this product',
      product: deletedItem,
    });
  }
}

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
