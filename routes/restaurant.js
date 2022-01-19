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

const setData = (res, query) => {
    console.log(query);
    db.query(query, (err,rows) => {
        if(err) throw err;
        console.log('Data Updated in DB');
        res.send({success:true, data:rows});
    });
}

router.post('/search/:resId', (req, res) => {
    const {dishName, cuisine, dishDesc, dishCat} = req.body;
    const {resId} = req.params;
    if(typeof dishName !== 'undefined'){
        getData(res, sql.getDishByName(resId, dishName));
    }else if(typeof cuisine !== 'undefined'){
        getData(res, sql.getDishByCuisine(resId, cuisine));
    }else if(typeof dishDesc !== 'undefined'){
        getData(res, sql.getDishByDesc(resId, dishDesc));
    }else if(typeof dishCat !== 'undefined'){
        getData(res, sql.getDishByCategory(resId, dishCat));
    }else{
        getData(res, sql.getAllDishes(resId));
    }
});

router.post('/addResToFav/:userId/:resId', (req, res) => {
    const {resId, userId} = req.params;
    setData(res, sql.addResToFav(userId, resId));
})

router.delete('/removeResFromFav/:userId/:resId', (req, res) => {
    const {resId, userId} = req.params;
    setData(res, sql.removeResFromFav(userId, resId));
})

router.get('/getDishes/:resId', (req, res) => {
    const {resId} = req.params;
    getData(res, sql.getAllDishes(resId));
})

router.get('/:resId', (req, res) => {
    const {resId} = req.params;
    getData(res, sql.getResDetails(resId));
})

module.exports = router;