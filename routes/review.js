const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
  check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
  check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
  check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
];

module.exports = (params) => {
  const { reviewService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const reviews = await reviewService.getList();
      const errors = request.session.review ? request.session.review.errors : false;

      const successMessage = request.session.review ? request.session.review.message : false;

      request.session.review = {};

      return response.render('pages/reviews', {
        pageTitle: 'Review',
        template: 'reviews',
        reviews,
        errors,
        successMessage,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        request.session.review = {
          errors: errors.array(),
        };
        return response.redirect('/review');
      }

      const { name, email, title, message } = request.body;
      await reviewService.addEntry(name, email, title, message);

      request.session.review = {
        message: 'Thank you for your review!',
      };

      return response.redirect('/review');
    } catch (error) {
      return next(error);
    }
  });

  router.post('/api', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }
      const { name, email, title, message } = request.body;
      await reviewService.addEntry(name, email, title, message);
      const review = await reviewService.getList();
      return response.json({ review });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
