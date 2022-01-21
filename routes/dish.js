const router = require("express").Router();
const db = require("../dbconfig");
const sql = require("../model/dish.js");
const Joi = require("joi");
const _ = require("lodash");
const {
  getAllItemsInCart,
  getAddonsForOrderItem,
} = require("../model/cart.js");

const getData = (res, query) => {
  console.log(query);
  db.query(query, (err, rows) => {
    if (err) throw err;
    console.log("Data received from Db:");
    res.send({ success: true, data: rows });
  });
};

router.post("/addDishToCart", (req, res) => {
  const { userId, dishId, quantity, addons } = req.body;
  if (typeof dishId === "undefined") {
    res.send("dishId is Required");
    return;
  } else {
    if (validateAddons(dishId, req, res) === 0) {
      return;
    }
  }

  console.log("Validation Sucessfull");

  db.query(getAllItemsInCart(userId), async (err, rows) => {
    if (err) throw err;
    const queryResults = async () =>
      await Promise.all(
        rows.map(async (item) => {
          return new Promise((resolve, reject) => {
            db.query(getAddonsForOrderItem(item.order_id), (err, result) => {
              if (err) return reject(err);
              else {
                item.addons = result;
                return resolve(item);
              }
            });
          });
        })
      );
    const results = await queryResults();
    let duplicateOrderId = checkDuplicate(results, dishId, addons);
    if (duplicateOrderId) {
      db.query(sql.increaseQuantityInCart(duplicateOrderId), (err, rows) => {
        if (err) throw err;
        console.log("Duplicate Found, Quantity Increased");
        res.send(rows);
      });
    } else {
      db.beginTransaction(function (err) {
        if (err) {
          throw err;
        }
        db.query(
          sql.addDishToCart(userId, dishId, quantity),
          function (err, result) {
            if (err) {
              return db.rollback(function () {
                throw err;
              });
            }
            const orderId = result.insertId;
            if (addons && addons.length) {
              const rowsToMap = addons.map((addon) => {
                return [orderId, addon];
              });
              db.query(
                sql.mapAddonsWithOrder,
                [rowsToMap],
                function (err, result) {
                  if (err) {
                    return db.rollback(function () {
                      throw err;
                    });
                  }
                  db.commit(function (err) {
                    if (err) {
                      return db.rollback(function () {
                        throw err;
                      });
                    }
                    console.log("Items added to Cart");
                  });
                }
              );
            } else {
              db.commit(function (err) {
                if (err) {
                  return db.rollback(function () {
                    throw err;
                  });
                }
                console.log("Items added to Cart");
              });
            }
            res.send(result);
            return;
          }
        );
      });
    }
  });
});

router.post('/increaseQuantityInCart/:orderId', (req, res) => {
  getData(res, sql.increaseQuantityInCart(req.params.orderId));
})

router.get("/getInstancesInCart/:userId/:dishId", (req, res) => {
  const { userId, dishId } = req.params;
  getData(res, sql.getInstancesInCart(userId, dishId));
});

router.get("/getAddons/:dishId", (req, res) => {
  const { dishId } = req.params;
  getData(res, sql.getAddonsForDish(dishId));
});

router.get("/:dishId", (req, res) => {
  const { dishId } = req.params;
  getData(res, sql.getDishDetails(dishId));
});

module.exports = router;

const validateAddons = (dishId, req, res) => {
  db.query(
    `select min_addon, max_addon from dish where id = ${dishId}`,
    (err, result) => {
      if (err) {
        res.send(err);
        return 0;
      } else if (!result.length) {
        res.send("dishId does not belong to a valid dish");
        return 0;
      } else {
        const { min_addon: minAddon, max_addon: maxAddon } = result[0];
        const dishSchema = Joi.object({
          userId: Joi.number().required(),
          dishId: Joi.number().required(),
          quantity: Joi.number().required(),
          addons: Joi.array().items(Joi.number()).min(minAddon).max(maxAddon),
        });

        const { error } = dishSchema.validate(req.body);
        if (error) {
          res.send(error);
          return 0;
        }
      }
      return 1;
    }
  );
};

const checkDuplicate = (cartItems, dishId, addons) => {
  let index = 0;
  for (index = 0; index < cartItems.length; index++) {
    if (
      _.isEqual(cartItems[index].dish_id, dishId) &&
      _.isEqual(
        cartItems[index].addons.map((addonDetails) => addonDetails.id),
        addons
      )
    ) {
      return cartItems[index].order_id;
    }
  }
  return null;
};
