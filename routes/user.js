const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/user.js')

const getData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send({success:true, data:rows});
    });
}

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    getData(res, sql.checkUser(username, password));
});

router.post('/signup', (req, res) => {
    const {username, password} = req.body;
    getData(res, sql.addUser(username, password));
})



module.exports = router;