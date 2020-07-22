const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { golferService } = params;

  router.get('/', async (request, response) => {
    const golfers = await golferService.getList();
    response.render('pages/golfers', { pageTitle: 'Golfers', template: 'golfers', golfers });
  });

  router.get('/:shortname', async (request, response) => {
    const golfer = await golferService.getGolfer(request.params.shortname);
    response.render('pages/golfer-detail', {
      pageTitle: 'Golfer',
      template: 'golfer-detail',
      golfer,
    });
  });

  return router;
};
