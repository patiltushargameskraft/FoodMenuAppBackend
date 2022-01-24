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
    where dish.name like "%${name}%"
    limit 10
    `
    return query;
}

const getDishByDesc = (resId, desc) => {
const query = 
`
select dish.* from dish
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
where match(dish.description) against("${desc}")
limit 10
`
return query;
}

const getDishByCuisine = (resId, cuisine) => {
const query = 
`
select dish.* from dish
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
where cuisine like "${cuisine}%"
limit 10
`
return query;
}

const getDishByCategory = (resId, category) => {
const query = 
`
select distinct(dish.id) as uniqueIds, dish.* from categories
inner join category_dish
on category_dish.categories_id = (select id where categories.name like "${category}%")
inner join dish
on category_dish.dish_id = dish.id
inner join restaurant on dish.restaurant_id = ${resId} and dish.restaurant_id = restaurant.id
limit 10
`
return query;
}

const addResToFav = (userId, resId) => {
    return (
        `
        insert into fav (restaurant_id, user_id) values (${resId}, ${userId});
        `
    )
}

const removeResFromFav = (userId, resId) => {
    return (
        `
        delete from fav
        where restaurant_id = ${resId} and user_id = ${userId}
        `
    )
}

const getResDetails = (resId) => {
    const query = 
    `
    select restaurant.* from restaurant
    where id = ${resId}
    `
    return query;
    }

const getCategoriesForRestaurant = (resId) => {
    const query = 
    `
    select categories.name from categories
    inner join restaurant
    `
}

const getIdNameMap = (resId) => {
    return(
        `
        select name from restaurant
        where id = ${resId}
        `
    )
}

module.exports = {getDishByName, getDishByCategory, getDishByDesc, getDishByCuisine, getAllDishes, getResDetails,addResToFav, removeResFromFav, getIdNameMap}