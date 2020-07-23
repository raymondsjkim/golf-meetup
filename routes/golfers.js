const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { golferService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const golfers = await golferService.getList();
      return response.render('pages/golfers', {
        pageTitle: 'Golfers',
        template: 'golfers',
        golfers,
      });
    } catch (error) {
      return next(error);
    }
  });

  // route golfer page
  router.get('/:shortname', async (request, response) => {
    const golfer = await golferService.getGolfer(request.params.shortname);
    const scorecards = await golferService.getScorecardForSpeaker(request.params.shortname);
    response.render('pages/golfer-detail', {
      pageTitle: 'Golfer',
      template: 'golfer-detail',
      golfer,
      scorecards,
    });
  });

  return router;
};
