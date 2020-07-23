const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { reviewService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const reviews = await reviewService.getList();
      return response.render('pages/reviews', {
        pageTitle: 'Review',
        template: 'reviews',
        reviews,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });

  return router;
};
