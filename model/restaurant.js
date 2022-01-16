const getAllDishes = (resId) => {
const query = 
`
select dish.* from dish
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
`
return query;
}

const getDishByName = (resId, name) => {
    const query = 
    `
    select dish.* from dish
    inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
    where dish.name like '%${name}%'
    `
    return query;
}

const getDishByDesc = (resId, desc) => {
const query = 
`
select dish.* from dish
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
where match(dish.description) against('${desc}')
limit 10
`
return query;
}

const getDishByCuisine = (resId, cuisine) => {
const query = 
`
select dish.* from dish
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
where cuisine like '${cuisine}'
`
return query;
}

const getDishByCategory = (resId, category) => {
const query = 
`
select dish.* from categories
inner join category_dish
on category_dish.categories_id = (select id where categories.name = '${category}')
inner join dish
on category_dish.dish_id = dish.id
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
`
return query;
}

module.exports = {getDishByName, getDishByCategory, getDishByDesc, getDishByCuisine, getAllDishes}