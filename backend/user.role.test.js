const request = require('supertest');
const express = require('express');
const { sequelize, User } = require('./models/models');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

// Mock Auth0 and role middleware for test
app.use((req, res, next) => { req.user = { "https://officespace.example.com/roles": 'Admin' }; next(); });

describe('PATCH /api/users/:id/role', () => {
  let testUser;
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    testUser = await User.create({ username: 'test', email: 'test@example.com', role: 'User' });
  });
  it('should change user role to OfficeManager', async () => {
    const res = await request(app)
      .patch(`/api/users/${testUser.id}/role`)
      .send({ role: 'OfficeManager' });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.role).toBe('OfficeManager');
  });
  it('should reject invalid role', async () => {
    const res = await request(app)
      .patch(`/api/users/${testUser.id}/role`)
      .send({ role: 'NotARole' });
    expect(res.statusCode).toBe(400);
  });
});
