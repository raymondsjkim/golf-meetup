const express = require('express');
const path = require('path');

const ReviewService = require('./services/ReviewService');
const GolferService = require('./services/GolferService');

const reviewService = new ReviewService('./data/review.json');
const golferService = new GolferService('./data/golfers.json');

const routes = require('./routes');

const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

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
