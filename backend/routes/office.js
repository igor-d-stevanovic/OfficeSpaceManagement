const express = require('express');
const router = express.Router();
const { Office } = require('../models/models');

// GET all offices
router.get('/', async (req, res) => {
  const offices = await Office.findAll();
  res.json(offices);
});

// GET one office
router.get('/:id', async (req, res) => {
  const office = await Office.findByPk(req.params.id);
  if (!office) return res.status(404).json({ error: 'Not found' });
  res.json(office);
});

// CREATE office
router.post('/', async (req, res) => {
  const office = await Office.create(req.body);
  res.status(201).json(office);
});

// UPDATE office
router.put('/:id', async (req, res) => {
  const office = await Office.findByPk(req.params.id);
  if (!office) return res.status(404).json({ error: 'Not found' });
  await office.update(req.body);
  res.json(office);
});

// DELETE office
router.delete('/:id', async (req, res) => {
  const office = await Office.findByPk(req.params.id);
  if (!office) return res.status(404).json({ error: 'Not found' });
  await office.destroy();
  res.status(204).end();
});

module.exports = router;
