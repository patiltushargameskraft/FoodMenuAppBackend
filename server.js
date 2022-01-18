const express = require('express');
const app = express();
const db = require('./dbconfig');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js')

const port = 1234;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})



