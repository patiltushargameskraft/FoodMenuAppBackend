
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.json());
var database

app.get('/', (req, res) => {
    res.send('Welcome to mongodb Api')
})

app.get('/api', (req, res) => {
  database.collection('exp').find({}).toArray((err, result) =>{
    if(err) throw err;
    res.send(result) 
    console.log(result)
  }) 
})

app.listen(port,hostname, () => {
    MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true}, (error, result) => {
        if(error) throw error
        database = result.db('exp')
        console.log('connection successful')
    })
})

