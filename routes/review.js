const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { reviewService } = params;

  router.get('/', async (request, response) => {
    const reviews = await reviewService.getList();
    return response.json(reviews);
  });

  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });

  return router;
};
