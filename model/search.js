const getAllDishes=
`
select * from dish
`

const getDishByName = (name) => {

return(
`
select * from dish
where dish.name like "%${name}%"
limit 10
`)
}

const getDishByDesc = (desc) => {
return (
`
select * from dish
where match(description) against("${desc}")
limit 10
`)
}

const getDishByCuisine = (cuisine) => {
return( 
`
select * from dish
where cuisine like "${cuisine}%"
limit 10
`)
}

const getDishByCategory = (category) => {
return(
`
select dish.* from categories
inner join category_dish
on category_dish.categories_id = (select categories.id where categories.name like "${category}%")
inner join dish
on category_dish.dish_id = dish.id
limit 10
`)
}

const getResByName = (name) => {
return (
`
select * from restaurant
where name like "%${name}%"
limit 10;
`)
}

module.exports = {getDishByName, getDishByCategory, getDishByDesc, getDishByCuisine, getResByName, getAllDishes}