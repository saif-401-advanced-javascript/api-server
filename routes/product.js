'use strict';
const express = require('express');
const router = express.Router();
const productsModel = require('../lib/models/products/product.model');

router.get('/', getAll);
router.post('/', insertNewHandler);
router.get('/:id', getOneHandler);
router.put('/:id', updateOneHandler);
router.delete('/:id', deleteOneHandler);

function getAll(req, res, next) {
  productsModel
    .read()
    .then((data) => {
      res.status(200);
      res.json({
        count: data.length,
        results: data,
      });
    })
    .catch(next);
}

function insertNewHandler(req, res, next) {
  productsModel
    .create(req.body)
    .then((data) => {
      res.status(201);
      res.json(data);
    })
    .catch(next);
}

function getOneHandler(req, res, next) {
  productsModel
    .read(req.params.id)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch(next);
}

function updateOneHandler(req, res, next) {
  productsModel
    .update(req.params.id, req.body)
    .then((data) => {
      res.status(200);
      res.json({
        message: 'you just updated this record',
        record: data,
      });
    })
    .catch(next);
}

function deleteOneHandler(req, res, next) {
  productsModel
    .delete(req.params.id, req.body)
    .then((data) => {
      res.status(200);
      res.json({
        message: 'you just deleted this record',
        record: data,
      });
    })
    .catch(next);
}

module.exports = router;
