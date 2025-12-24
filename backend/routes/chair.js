const express = require('express');
const router = express.Router();
const { Chair } = require('../models/models');

// GET all chairs
router.get('/', async (req, res) => {
  const chairs = await Chair.findAll();
  res.json(chairs);
});

// GET one chair
router.get('/:id', async (req, res) => {
  const chair = await Chair.findByPk(req.params.id);
  if (!chair) return res.status(404).json({ error: 'Not found' });
  res.json(chair);
});

// CREATE chair
router.post('/', async (req, res) => {
  const chair = await Chair.create(req.body);
  res.status(201).json(chair);
});

// UPDATE chair
router.put('/:id', async (req, res) => {
  const chair = await Chair.findByPk(req.params.id);
  if (!chair) return res.status(404).json({ error: 'Not found' });
  await chair.update(req.body);
  res.json(chair);
});

// DELETE chair
router.delete('/:id', async (req, res) => {
  const chair = await Chair.findByPk(req.params.id);
  if (!chair) return res.status(404).json({ error: 'Not found' });
  await chair.destroy();
  res.status(204).end();
});

module.exports = router;
