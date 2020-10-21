'use strict';
const express = require('express');
const router = express.Router();
const getModel = require('../middleware/model');

router.param('model', getModel);

router.get('/:model', getAll);
router.post('/:model', insertNewHandler);
router.get('/:model/:id', getOneHandler);
router.put('/:model/:id', updateOneHandler);
router.delete('/:model/:id', deleteOneHandler);

function getAll(req, res, next) {
  req.model
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
  req.model
    .create(req.body)
    .then((data) => {
      res.status(201);
      res.json(data);
    })
    .catch(next);
}

function getOneHandler(req, res, next) {
  req.model
    .read(req.params.id)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch(next);
}

function updateOneHandler(req, res, next) {
  req.model
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
  req.model
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
