
const express = require('express');
const mysql = require('mysql');
const port = 3000;
const app = express();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tushar@2101',
});

db.connect((err) => {
  if(err) throw err;
  console.log('MySql Connected');
});

app.get('/createdb', (req,res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if(err) throw err;
    res.send('Databse Created');
    console.log(result);
  });
});


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Node Js server');
})

app.listen(port, () => {
    console.log('server started on port 3000');
})

