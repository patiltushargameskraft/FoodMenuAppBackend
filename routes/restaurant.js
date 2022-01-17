const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/restaurant.js');

const getData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send({success:true, data:rows});
    });
}

router.get('/search/:id', (req, res) => {
    let {dishName, resName, cuisine, dishDesc, dishCat} = req.body;
    const {id: resId} = req.params
    if(dishName){
        getData(res, sql.getDishByName(resId, dishName));
    }
    else if(resName){
        getData(res, sql.getResByName(resId, resName));
    }else if(cuisine){
        getData(res, sql.getDishByCuisine(resId, cuisine));
    }else if(dishDesc){
        getData(res, sql.getDishByDesc(resId, cuisine));
    }else if(dishCat){
        getData(res, sql.getDishByCategory(resId, dishCat));
    }else{
        getData(res, sql.getAllDishes(resId));
    }
});

router.get('/:id', (req, res) => {
    const {id: resId} = req.params;
    getData(res, sql.getAllDishes(resId));
})

module.exports = router;