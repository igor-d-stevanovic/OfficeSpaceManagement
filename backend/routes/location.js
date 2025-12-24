const express = require('express');
const router = express.Router();
const { Location } = require('../models/models');

// GET all locations
router.get('/', async (req, res) => {
  const locations = await Location.findAll();
  res.json(locations);
});

// GET one location
router.get('/:id', async (req, res) => {
  const location = await Location.findByPk(req.params.id);
  if (!location) return res.status(404).json({ error: 'Not found' });
  res.json(location);
});

// CREATE location
router.post('/', async (req, res) => {
  const location = await Location.create(req.body);
  res.status(201).json(location);
});

// UPDATE location
router.put('/:id', async (req, res) => {
  const location = await Location.findByPk(req.params.id);
  if (!location) return res.status(404).json({ error: 'Not found' });
  await location.update(req.body);
  res.json(location);
});

// DELETE location
router.delete('/:id', async (req, res) => {
  const location = await Location.findByPk(req.params.id);
  if (!location) return res.status(404).json({ error: 'Not found' });
  await location.destroy();
  res.status(204).end();
});

module.exports = router;
