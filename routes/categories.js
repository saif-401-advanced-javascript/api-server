'use strict';
const express = require('express');
const router = express.Router();
const categoriesModel = require('../lib/models/categories/catigories.models');

router.get('/', getAll);
router.post('/', insertNewHandler);
router.get('/:id', getOneHandler);
router.put('/:id', updateOneHandler);
router.delete('/:id', deleteOneHandler);

async function getAll(req, res, next) {
  categoriesModel
    .read()
    .then((data) => {
      res.status(200);
      res.send({
        count: data.length,
        results: data,
      });
    })
    .catch(next);
}

function insertNewHandler(req, res, next) {
  categoriesModel
    .create(req.body)
    .then((data) => {
      res.status(201);
      res.json(data);
    })
    .catch(next);
}

function getOneHandler(req, res, next) {
  categoriesModel
    .read(req.params.id)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch(next);
}

function updateOneHandler(req, res, next) {
  categoriesModel
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
  categoriesModel
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
