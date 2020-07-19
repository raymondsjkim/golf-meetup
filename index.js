//get express and create routes
const express = require('express');
const path = require('path');
const { response } = require('express');

const app = express();

const port = 4000;


//serve static files 
//app.use is how middlewhere is applied in express
//instruct express to look into the static folder for each request it receives
//and if it finds a matching file, it will send it to the browser
app.use(express.static(path.join(__dirname, './view')));

//
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './view/index.html'));
});





app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
})