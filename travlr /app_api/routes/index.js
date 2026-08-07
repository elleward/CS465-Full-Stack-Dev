const express = require('express');
const router = express.Router();
require('../models/user');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

router
  .route('/login')
  .post(authController.login);

router
  .route('/register')
  .post(authController.register);

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, isAdmin, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, isAdmin, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, isAdmin, tripsController.tripsDeleteTrip);

module.exports = router;
