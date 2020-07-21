const express = require('express');

const golfersRoute = require('./golfers');
const reviewRoute = require('./review');

const router = express.Router();

module.exports = (params) => {
  // route homepage
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/golfers', golfersRoute(params));
  router.use('/review', reviewRoute(params));

  return router;
};
