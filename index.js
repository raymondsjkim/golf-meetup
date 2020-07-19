const express = require('express');
const path = require('path');

const app = express();

const port = 4000;

app.use(express.static(path.join(__dirname, './view')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './view/index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port: ${port}`);
});
