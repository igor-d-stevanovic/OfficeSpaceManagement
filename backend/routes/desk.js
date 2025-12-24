const express = require('express');
const router = express.Router();
const { Desk } = require('../models/models');

// GET all desks
router.get('/', async (req, res) => {
  const desks = await Desk.findAll();
  res.json(desks);
});

// GET one desk
router.get('/:id', async (req, res) => {
  const desk = await Desk.findByPk(req.params.id);
  if (!desk) return res.status(404).json({ error: 'Not found' });
  res.json(desk);
});

// CREATE desk
router.post('/', async (req, res) => {
  const desk = await Desk.create(req.body);
  res.status(201).json(desk);
});

// UPDATE desk
router.put('/:id', async (req, res) => {
  const desk = await Desk.findByPk(req.params.id);
  if (!desk) return res.status(404).json({ error: 'Not found' });
  await desk.update(req.body);
  res.json(desk);
});

// DELETE desk
router.delete('/:id', async (req, res) => {
  const desk = await Desk.findByPk(req.params.id);
  if (!desk) return res.status(404).json({ error: 'Not found' });
  await desk.destroy();
  res.status(204).end();
});

module.exports = router;
