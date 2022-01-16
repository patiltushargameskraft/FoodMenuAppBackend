const getDishDetails = (dishId) => {
    const query = 
    `
    select * from dish
    where id = ${dishId}
    `
    return query;
}

const getAddonsForDish = (dishId) => {
    const query = 
    `
    select add_on.* from dish
    inner join add_on_dish on dish_id = ${dishId} and dish_id = dish.id
    inner join add_on on add_on.id = add_on_dish.add_on_id
    `
    return query;
}

module.exports = {getDishDetails, getAddonsForDish};