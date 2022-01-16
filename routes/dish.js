const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/dish.js');

const getData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send({success:true, data:rows});
    });
}

router.get('/getAddons/:id', (req, res) => {
    const {id: dishId} = req.params;
    getData(res, sql.getAddonsForDish(dishId));
})

router.get('/:id', (req, res) => {
    const {id: dishId} = req.params;
    getData(res, sql.getDishDetails(dishId));
})

module.exports = router;