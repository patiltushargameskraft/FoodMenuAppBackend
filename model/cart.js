const getAllItemsInCart = (userId) => {
    return (
`
    select order_item.id as order_id, order_item.*, dish.* from order_item
	inner join dish on order_item.dish_id = dish.id
	where user_id = ${userId}
`
    )
}

const getOrderItemDetail = (userId, orderItemId) => {
    return (
        `
        select order_item.id as order_id, order_item.*, dish.* from order_item
    	inner join dish on order_item.dish_id = dish.id
    	where user_id = ${userId} and order_item.id = ${orderItemId}
        `
    )
}

const getAddonsForOrderItem = (orderItemId) => {
    return  (
        `
        select add_on.* from add_on
        inner join order_item_add_on on order_item_add_on.add_on_id = add_on.id
        inner join order_item on order_item.id = order_item_add_on.order_item_id
        where order_item.id = ${orderItemId}
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

module.exports = {getAllItemsInCart, getOrderItemDetail,checkOutCartItems, deleteItemFromCart, getAddonsForOrderItem};