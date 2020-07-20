const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Golfers List');
  });

  router.get('/:shortname', (request, response) => {
    return response.send(`Detail page of ${request.params.shortname}`);
  });

  return router;
};
