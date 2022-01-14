const express = require('express');
const mysql = require('mysql');
const port = 3000;
const app = express();
const queryString = require('query-string')

const db = mysql.createConnection({
  host: 'bi30tloqqg6aqnsjzk5h-mysql.services.clever-cloud.com',
  user: 'uapdthevueb7t3hg',
  password: 'zEZ6 Q84UgLSHREfJwowg',
  database: 'bi30tloqqg6aqnsjzk5h'
});

db.connect((err) => {
  if(err) throw err;
  console.log('MySql Connected');
});

app.use(express.json());

app.get('/getUsers', (req,res) => {
  let sql = `select * from user`
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log('Current Users Are');
    res.send(result);
  });
});



app.get('/', (req, res) => {
    res.send('Welcome to Node Js server');
})

app.listen(port, () => {
    console.log('server started on port 3000');
})

