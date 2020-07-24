const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');

// services for json data
const ReviewService = require('./services/ReviewService');
const GolferService = require('./services/GolferService');

const reviewService = new ReviewService('./data/review.json');
const golferService = new GolferService('./data/golfers.json');

const routes = require('./routes');

const app = express();
const port = 4000;

// set cookie-session
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['BjnkNJnNKJN&y&TVh6T6', 'jnnJNnuh87UuhIUh87yt'],
  })
);

// set body parser to parse to json from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'GOLF Meetups';

// serve static files with express static middleware
app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await golferService.getNames();
    response.locals.golferNames = names;
    return next();
  } catch (error) {
    return next(error);
  }
});

// set routes
app.use(
  '/',
  routes({
    reviewService,
    golferService,
  })
);

// set error handler
app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((error, request, response, next) => {
  response.locals.message = error.message;
  if (response.locals.message) {
    const status = error.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
  } else {
    next();
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port: ${port}`);
});
