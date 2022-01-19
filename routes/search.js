const router = require("express").Router();
const db = require('../dbconfig')
const sql = require('../model/search.js')

getData = (res, query) => {
    console.log(query)
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:');
        res.send(rows);
    });
}

router.post('/', (req, res) => {
    const {dishName, resName, cuisine, dishDesc, dishCat} = req.body;
    if(dishName){
        getData(res, sql.getDishbyName(dishName));
    }
    else if(resName){
        getData(res, sql.getResByName(resName));
    }else if(cuisine){
        getData(res, sql.getDishByCuisine(cuisine));
    }else if(dishDesc){
        getData(res, sql.getDishByDesc(dishDesc));
    }else if(dishCat){
        getData(res, sql.getDishByCategory(dishCat));
    }else{
        getData(res, sql.getAllDishes);
    }
});

module.exports = router;