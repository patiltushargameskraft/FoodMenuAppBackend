const getPromotedRes = 
`
select restaurant.* from promoted_res
inner join restaurant
on restaurant.id = promoted_res.restaurant_id
` 

const getCategories = 
`
select * from categories
`

const getFavRes = 
`
select restaurant.* from fav
inner join restaurant
on restaurant.id = fav.restaurant_id

`

module.exports = {getPromotedRes, getCategories, getFavRes}