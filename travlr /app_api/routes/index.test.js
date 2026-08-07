const express = require('express');
const jwt = require('jsonwebtoken');
const request = require('supertest');

jest.mock('../controllers/trips', () => ({
  tripsList: jest.fn((req, res) => res.status(200).json([])),
  tripsFindByCode: jest.fn((req, res) => res.status(200).json({ code: req.params.tripCode })),
  tripsAddTrip: jest.fn((req, res) => res.status(201).json({ code: req.body.code })),
  tripsUpdateTrip: jest.fn((req, res) => res.status(200).json({ code: req.params.tripCode })),
  tripsDeleteTrip: jest.fn((req, res) => res.status(204).send())
}));

jest.mock('../controllers/authentication', () => ({
  login: jest.fn(),
  register: jest.fn()
}));

const tripsController = require('../controllers/trips');
const apiRouter = require('./index');

const secret = 'rbac-test-secret';
const app = express();
app.use(express.json());
app.use('/api', apiRouter);

const tokenFor = (role) => jwt.sign({ _id: 'user-id', role }, secret);

describe('trip route RBAC', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = secret;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['post', '/api/trips', 'tripsAddTrip', 201],
    ['put', '/api/trips/TRIP1', 'tripsUpdateTrip', 200],
    ['delete', '/api/trips/TRIP1', 'tripsDeleteTrip', 204]
  ])('allows an admin to %s a trip', async (method, url, controller, status) => {
    const response = await request(app)
      [method](url)
      .set('Authorization', `Bearer ${tokenFor('admin')}`)
      .send({ code: 'TRIP1' });

    expect(response.status).toBe(status);
    expect(tripsController[controller]).toHaveBeenCalledTimes(1);
  });

  test('denies a non-admin with 403', async () => {
    const response = await request(app)
      .post('/api/trips')
      .set('Authorization', `Bearer ${tokenFor('user')}`)
      .send({ code: 'TRIP1' });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Admin access required');
    expect(tripsController.tripsAddTrip).not.toHaveBeenCalled();
  });

  test('denies an unauthenticated request with 401', async () => {
    const response = await request(app)
      .delete('/api/trips/TRIP1');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
    expect(tripsController.tripsDeleteTrip).not.toHaveBeenCalled();
  });
});
