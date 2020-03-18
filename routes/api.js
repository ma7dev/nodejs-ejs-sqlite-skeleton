const express = require('express');

const api = express.Router();

api.get('/', (req, res) => {
  res.send('API home page');
});

api.get('/objects', async (req, res) => {
  let objects = await global.ObjectModel.find();

  const start = req.query.start;
  if (start) {
    objects = objects.filter(object => object.timestamp >= Number(start));
  }

  const end = req.query.end;
  if (end) {
    objects = objects.filter(object => object.timestamp <= Number(end));
  }

  res.json(objects);
});

api.get('/objects/:id', async (req, res) => {
  const objects = await global.ObjectModel.find({ id: req.params.id });
  res.json(objects);
});

api.post('/objects', async (req, res) => {
  const { id, className, timestamp, camera, properties } = req.body;

  // Send 400 if any data values are omitted in body
  if (!id || !className || !timestamp || !camera || !properties) {
    return res.sendStatus(400);
  }

  await new global.ObjectModel({
    id,
    className,
    timestamp,
    camera,
    properties,
  }).save();

  res.json(req.body);
});

module.exports = api;
