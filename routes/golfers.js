const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { golferService } = params;

  router.get('/', async (request, response) => {
    const golfers = await golferService.getList();
    return response.json(golfers);
  });

  router.get('/:shortname', (request, response) => {
    return response.send(`Detail page of ${request.params.shortname}`);
  });

  return router;
};
