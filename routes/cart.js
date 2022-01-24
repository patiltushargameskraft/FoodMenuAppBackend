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

router.post('/decreaseQuantityInCart/:orderId', (req, res) => {
    const {orderId} = req.params;
    setData(res, sql.decreaseQuantityInCart(orderId));
})


router.get('/getOrderItemDetail/:userId/:orderItemId', (req, res) => {
    const {userId, orderItemId} = req.params;
    db.query(sql.getOrderItemDetail(userId, orderItemId), (err,rows) => {
        if(err) throw err;
        let result = rows;
        db.query(sql.getAddonsForOrderItem(orderItemId), (err, rows) => {
            if(err) throw err;
            result[0].addons = rows;
            console.log('Data received from Db:');
            res.send({success:true, data:result});
        });
    });
})

router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    
    db.query(sql.getAllItemsInCart(userId) , async (err,rows) => {
        if(err) throw err;
        const queryResults = async () => await Promise.all(
            rows.map(async (item) => {
                return new Promise((resolve, reject) => {
                    db.query(sql.getAddonsForOrderItem(item.order_id), (err, result) => {
                        if(err) return reject(err);
                        else {
                            item.addons = result;
                            return resolve(item);
                        }
                    })
                })
            })
        );
        const results = await queryResults();
        res.send({success: true, data: results});
    });
})

module.exports = router;