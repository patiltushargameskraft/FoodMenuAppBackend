const getAllItemsInCart = (userId) => {
    return (
`
    select order_item.id as order_id, order_item.*, dish.* from order_item
	inner join dish on order_item.dish_id = dish.id
	where user_id = ${userId}
`
    )
}

const deleteItemFromCart = (orderId, userId) => {
    return (
        `
        delete from order_item
        where id = ${orderId} and user_id = ${userId}
        `
    )
}

const checkOutCartItems = (userId) => {
    return (
        `
        delete from order_item where user_id = ${userId}
        `
    )
}

module.exports = {getAllItemsInCart, checkOutCartItems, deleteItemFromCart};