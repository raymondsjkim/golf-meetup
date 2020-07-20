const express = require('express');

const golfersRoute = require('./golfers');
const reviewRoute = require('./review');

const router = express.Router();

module.exports = () => {
  // route homepage
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/golfers', golfersRoute());
  router.use('/review', reviewRoute());

  return router;
};
