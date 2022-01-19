const getAllDishes=
`
select * from dish
`

const getDishByName = (name) => {

return(
`
select * from dish
where dish.name like '%${name}%'
`)
}

const getDishByDesc = (desc) => {
return (
`
select * from dish
where match(description) against('${desc}')
`)
}

const getDishByCuisine = (cuisine) => {
return( 
`
select * from dish
where cuisine = '${cuisine}'
`)
}

const getDishByCategory = (category) => {
return(
`
select dish.* from categories
inner join category_dish
on category_dish.categories_id = (select categories.id where categories.name = '${category}')
inner join dish
on category_dish.dish_id = dish.id
`)
}

const getResByName = (name) => {
return (
`
select * from restaurant
where name like '%${name}%'
`)
}

module.exports = {getDishByName, getDishByCategory, getDishByDesc, getDishByCuisine, getResByName, getAllDishes}