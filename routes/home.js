const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/home.js')

const getData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send({success:true, data:rows});
    });
}

router.get('/getCategories', (req, res) => {
    getData(res, sql.getCategories);
});

router.get('/getFavRes', (req, res) => {
    getData(res, sql.getFavRes);
})

router.get('/', (req, res) => {
   getData(res, sql.getPromotedRes);
})

module.exports = router;