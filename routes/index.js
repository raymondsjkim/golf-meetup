const express = require('express');

const golfersRoute = require('./golfers');
const reviewRoute = require('./review');

const router = express.Router();

module.exports = (params) => {
  const { golferService } = params;

  // route homepage
  router.get('/', async (request, response, next) => {
    try {
      const topGolfers = await golferService.getList();
      return response.render('pages/index', {
        pageTitle: 'Welcome',
        template: 'index',
        topGolfers,
      });
    } catch (error) {
      return next(error);
    }
  });
  // route golfers list page
  router.use('/golfers', golfersRoute(params));
  // route review page
  router.use('/review', reviewRoute(params));

  return router;
};
