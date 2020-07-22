const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port: ${port}`);
});
