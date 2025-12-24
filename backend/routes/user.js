const express = require('express');
const router = express.Router();
const { User } = require('../models/models');

// GET all users
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET one user
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// CREATE user
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// UPDATE user
router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  await user.update(req.body);
  res.json(user);
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  await user.destroy();
  res.status(204).end();
});

module.exports = router;

// PATCH user role (Admin only)

let checkJwt = require('../auth');
let checkRole = require('../middleware/roleCheck');
// U test okruženju, middleware su no-op
if (process.env.NODE_ENV === 'test') {
  checkJwt = (req, res, next) => next();
  checkRole = () => (req, res, next) => next();
}

// Primer: PATCH /api/users/:id/role { role: "OfficeManager" }
router.patch('/:id/role', checkJwt, checkRole('Admin'), async (req, res) => {
  const { role } = req.body;
  if (!role || !['User', 'OfficeManager', 'Admin'].includes(role)) {
    return res.status(400).json({ error: 'Neispravna rola' });
  }
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Korisnik nije pronađen' });
  user.role = role;
  await user.save();
  res.json({ message: 'Rola uspešno izmenjena', user });
});
