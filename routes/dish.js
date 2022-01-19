const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/dish.js');
const Joi = require('joi');

const getData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send({success:true, data:rows});
    });
}

router.post('/addDishToCart', (req, res) => {
    const {userId, dishId, quantity, addons} = req.body;
    if(typeof dishId === 'undefined'){
        res.send("dishId is Required");
    }else{
        db.query(`select min_addon, max_addon from dish where id = ${dishId}`, (err, result) => {
            if(err) {
                res.send(err);
                return;
            }
            else if(!result.length){
                res.send("dishId does not belong to a valid dish")
                return;
            }
            else{
                const {minAddon, maxAddon} = result[0];
                const dishSchema = Joi.object({
                    userId: Joi.number().required(),
                    dishId: Joi.number().required(),
                    quantity: Joi.number().required(),
                    addons: Joi.array().items(Joi.number()).min(minAddon).max(maxAddon)
                })
            
                const {error} = dishSchema.validate(req.body)
                if(error){
                    res.send(error);
                    return;
                }
            }
        })
    }

    db.beginTransaction(function(err) {
        if (err) { throw err; }
        db.query(sql.addDishToCart(userId, dishId, quantity), function(err, result) {
            if (err) { 
                return db.rollback(function() {
                    throw err;
                });
            }            
            const orderId = result.insertId;
            if(addons && addons.length){
                const rowsToMap = addons.map(addon => {
                    return [orderId, addon];
                })
                db.query(sql.mapAddonsWithOrder, [rowsToMap], function(err, result) {
                    if (err) { 
                        return db.rollback(function() {
                            throw err;
                        });
                    }  
                    db.commit(function(err) {
                        if (err) { 
                            return db.rollback(function() {
                                throw err;
                            });
                        }
                        console.log('Items added to Cart');
                    });
                });
            }else{
                db.commit(function(err) {
                    if (err) { 
                        return db.rollback(function() {
                            throw err;
                        });
                    }
                    console.log('Items added to Cart');
                });
            }
            res.send(result);
        });
    });      
})


router.get('/getAddons/:dishId', (req, res) => {
    const {dishId} = req.params;
    getData(res, sql.getAddonsForDish(dishId));
})

router.get('/:dishId', (req, res) => {
    const {dishId} = req.params;
    getData(res, sql.getDishDetails(dishId));
})

module.exports = router;