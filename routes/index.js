const express = require('express');

const router = express.Router();

module.exports = () => {
  // route homepage
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });
  return router;
};
