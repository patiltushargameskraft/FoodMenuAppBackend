# FoodMenuAppBackend

clone -> npm install -> nodemon server.js

ENDPOINTS

--HOME (/)

GET

/ => get promoted restaurants

{
    "id": 2,
    "name": "Lapinoz",
    "description": "Worthy of being called your favorite. 'cause your favorite is what La Pinoz Pizza intend on being known for.",
    "image_url": "https://lapinozpizza.in/assets/wla_new/lapinoz/img/outlet-img.jpg"
}

/getFavRes/:userId => get Fav Restaurants

{
    "id": 2,
    "name": "Lapinoz",
    "description": "Worthy of being called your favorite. 'cause your favorite is what La Pinoz Pizza intend on being known for.",
    "image_url": "https://lapinozpizza.in/assets/wla_new/lapinoz/img/outlet-img.jpg"
}

/getCategories => get available Categories

{
    "id": 1,
    "name": "Vegetarian"
}

-- DISH (/dish/)


GET

/getAddons/:dishId => get all the addons for the current dish

{
    "id": 1,
    "name": "extra cheese",
    "price": 30
}

/:dishId => get Dish Details

{
    "id": 1,
    "name": "margherita pizza",
    "description": "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
    "cuisine": "Italian",
    "price": 499,
    "min_addon": 1,
    "max_addon": 3,
    "restaurant_id": 1,
    "image_url": "https://www.dominos.co.in//files/items/Margherit.jpg"
}

POST 

/addDishToCart 

req.body{
  userId, dishId, quantity, addons(array)
}

-- RESTAURANT (/restaurant/)

GET


/:resId => getDetails about Restaurant

{
    "id": 1,
    "name": "Domino's Pizza",
    "description": "Delivery/carryout chain offering a wide range of pizzas & a variety of other dishes & sides.",
    "image_url": "https://img.etimg.com/thumb/msid-87186310,width-300,imgsize-798953,,resizemode-4,quality-100/pizza.jpg"
}

/getDishes/:resId => get All dish from restaurant

 {
    "id": 1,
    "name": "margherita pizza",
    "description": "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
    "cuisine": "Italian",
    "price": 499,
    "min_addon": 1,
    "max_addon": 3,
    "restaurant_id": 1,
    "image_url": "https://www.dominos.co.in//files/items/Margherit.jpg"
}

/search/:resId => search within a given restaurant

req.body {
  dishName or cuisine or dishDesc or dishCat
}

{
    "id": 1,
    "name": "margherita pizza",
    "description": "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
    "cuisine": "Italian",
    "price": 499,
    "min_addon": 1,
    "max_addon": 3,
    "restaurant_id": 1,
    "image_url": "https://www.dominos.co.in//files/items/Margherit.jpg"
}

POST 

/addResToFav/:userId/:resId

DELETE

/removeResFromFav/:userId/:resId 

-- SEARCH (/search/)

/  => search globally 

req.body {
  dishName or cuisine or dishDesc or dishCat or resName
}

in case of resName, query will return restaurant object 
in other cases dish object

-- CART (/cart/)

GET

/:userId => Get The cart items for given USER iD

response Format  {
            "order_id": 1,
            "quantity": 1,
            "user_id": 1,
            "dish_id": 1,
            "name": "margherita pizza",
            "description": "Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
            "cuisine": "Italian",
            "price": 499,
            "min_addon": 1,
            "max_addon": 3,
            "restaurant_id": 1,
            "image_url": "https://www.dominos.co.in//files/items/Margherit.jpg"
        },
        
DELETE


/checkOutCartItems/:userId => empties the cart 

/deleteFromCart/:userId/:orderId => removes an item from the cart


/



