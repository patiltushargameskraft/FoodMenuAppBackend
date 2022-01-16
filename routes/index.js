const router = require('express').Router();
const home = require('./home');
const search = require('./search');
const restaurant = require('./restaurant');

router.use('/restaurant',restaurant)
router.use('/search', search);
router.use('/', home);

module.exports = router;