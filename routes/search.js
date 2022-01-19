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
    if(typeof dishName !== 'undefined'){
        getData(res, sql.getDishByName(dishName));
    }
    else if(typeof resName !== 'undefined'){
        getData(res, sql.getResByName(resName));
    }else if(typeof cuisine !== 'undefined'){
        getData(res, sql.getDishByCuisine(cuisine));
    }else if(typeof dishDesc !== 'undefined'){
        getData(res, sql.getDishByDesc(dishDesc));
    }else if(typeof dishCat !== 'undefined'){
        getData(res, sql.getDishByCategory(dishCat));
    }else{
        getData(res, sql.getAllDishes);
    }
});

module.exports = router;