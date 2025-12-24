const express = require('express');
const router = express.Router();
const { Reservation, Chair, Desk, Office, Location } = require('../models/models');
// GET my reservations (za prijavljenog korisnika)
let checkJwt = require('../auth');
// U test okruženju, checkJwt je no-op
if (process.env.NODE_ENV === 'test') {
  checkJwt = (req, res, next) => next();
}
router.get('/my', checkJwt, async (req, res) => {
  // Auth0 sub ili email se koristi za mapiranje na User.email
  const userEmail = req.user && req.user.email;
  if (!userEmail) return res.status(401).json({ error: 'Unauthorized' });
  const user = await require('../models/models').User.findOne({ where: { email: userEmail } });
  if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
  const reservations = await Reservation.findAll({
    where: { UserId: user.id },
    include: [
      {
        model: Chair,
        include: [{
          model: Desk,
          include: [{
            model: Office,
            include: [Location]
          }]
        }]
      }
    ]
  });
  res.json(reservations);
});

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


const checkRole = require('../middleware/roleCheck');

// UPDATE reservation (samo OfficeManager ili Admin)
router.put('/:id', checkJwt, checkRole(['OfficeManager', 'Admin']), async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return res.status(404).json({ error: 'Not found' });
  await reservation.update(req.body);
  res.json(reservation);
});

// DELETE reservation (samo OfficeManager ili Admin)
router.delete('/:id', checkJwt, checkRole(['OfficeManager', 'Admin']), async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (!reservation) return res.status(404).json({ error: 'Not found' });
  await reservation.destroy();
  res.status(204).end();
});

module.exports = router;
