const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { reviewService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const reviews = await reviewService.getList();
      return response.json(reviews);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });

  return router;
};
