const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/cart.js');

const getData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send({success:true, data:rows});
    });
}

const setData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data updated in Db:');
        res.send({success:true, data:rows});
    });
}

router.delete('/deleteFromCart/:userId/:orderId', (req, res) => {
    const {userId, orderId} = req.params;
    setData(res, sql.deleteItemFromCart(orderId, userId));
})


router.delete('/checkOutCartItems/:userId', (req, res) => {
    const {userId} = req.params;
    setData(res, sql.checkOutCartItems(userId));
})

router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    getData(res, sql.getAllItemsInCart(userId));
})

module.exports = router;