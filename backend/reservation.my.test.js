const request = require('supertest');
const express = require('express');
const { sequelize, User, Reservation, Chair, Desk, Office, Location } = require('./models/models');
const reservationRouter = require('./routes/reservation');


const app = express();
app.use(express.json());
// Mock Auth0 user for test (pre rute)
app.use((req, res, next) => {
  req.user = { email: 'user1@example.com' };
  next();
});
app.use('/api/reservations', reservationRouter);

describe('GET /api/reservations/my', () => {
  let user, chair, desk, office, location, reservation;
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    location = await Location.create({ name: 'TestLokacija' });
    office = await Office.create({ name: 'TestKancelarija', LocationId: location.id });
    desk = await Desk.create({ number: 'D1', OfficeId: office.id });
    chair = await Chair.create({ number: 'C1', DeskId: desk.id });
    user = await User.create({ username: 'user1', email: 'user1@example.com', role: 'User' });
    reservation = await Reservation.create({ date: '2025-12-25', UserId: user.id, ChairId: chair.id });
  });
  it('should return my reservations with related data', async () => {
    const res = await request(app)
      .get('/api/reservations/my');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].Chair.number).toBe('C1');
    expect(res.body[0].Chair.Desk.number).toBe('D1');
    expect(res.body[0].Chair.Desk.Office.name).toBe('TestKancelarija');
    expect(res.body[0].Chair.Desk.Office.Location.name).toBe('TestLokacija');
  });
});
