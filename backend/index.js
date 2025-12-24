const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();
const checkJwt = require('./auth');

const checkRole = require('./middleware/roleCheck');

app.use(express.json());

// CRUD API routes
app.use('/api/locations', require('./routes/location'));
app.use('/api/offices', require('./routes/office'));
app.use('/api/desks', require('./routes/desk'));
app.use('/api/chairs', require('./routes/chair'));
app.use('/api/users', require('./routes/user'));
app.use('/api/reservations', require('./routes/reservation'));

app.get('/', (req, res) => {
  res.send('OfficeSpaceManagement backend radi!');
});

// Primer zaštićene rute

// Primer rute za Admin rolu
app.get('/api/admin-only', checkJwt, checkRole('Admin'), (req, res) => {
  res.json({ message: 'Ovo je admin ruta, pristup dozvoljen samo adminima.' });
});

// Primer zaštićene rute (bilo koji korisnik)
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'Ovo je zaštićena ruta, pristup dozvoljen samo autentifikovanim korisnicima.' });
});

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
