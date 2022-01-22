const express = require('express');
const app = express();
const db = require('./dbconfig');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')
const process = require('process');

const port = process.env.PORT || 3000 ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, function(){
    console.log(`Express server listening on port ${port}`);
});


