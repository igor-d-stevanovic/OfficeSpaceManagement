const express = require('express');
const router = express.Router();
const { Reservation } = require('../models/models');

// GET all reservations
router.get('/', async (req, res) => {
  const reservations = await Reservation.findAll();
  res.json(reservations);
});

// GET one reservation
router.get('/:id', async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return res.status(404).json({ error: 'Not found' });
  res.json(reservation);
});

// CREATE reservation
// Rezerviši stolicu (validacija: nema duplih rezervacija za istu stolicu i datum)
router.post('/', async (req, res) => {
  const { date, ChairId } = req.body;
  const existing = await Reservation.findOne({ where: { date, ChairId } });
  if (existing) {
    return res.status(409).json({ error: 'Stolica je već rezervisana za taj datum.' });
  }
  const reservation = await Reservation.create(req.body);
  res.status(201).json(reservation);
});

// UPDATE reservation
router.put('/:id', async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return res.status(404).json({ error: 'Not found' });
  await reservation.update(req.body);
  res.json(reservation);
});

// DELETE reservation
router.delete('/:id', async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return res.status(404).json({ error: 'Not found' });
  await reservation.destroy();
  res.status(204).end();
});

module.exports = router;
