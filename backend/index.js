const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();
const checkJwt = require('./auth');

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
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'Ovo je zaštićena ruta, pristup dozvoljen samo autentifikovanim korisnicima.' });
});

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
