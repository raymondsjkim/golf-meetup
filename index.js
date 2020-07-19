//get express and create routes
const express = require('express');
const path = require('path');
const { response } = require('express');

const app = express();

const port = 4000;

app.get('/', (request, response) => {
    response.send('hello express =)');
});


app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
})