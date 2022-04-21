const Routes = require("express").Router()
const { get_categories, create_user, get_user, get_users, create_item, get_items_by_user, get_item_by_id, delete_item } = require("../controllers");

Routes.route("/api/categories").get(get_categories)

Routes.route("/api/users").post(create_user)

Routes.route("/api/users/:id").post(create_item)

Routes.route("/api/users/:id/items").get(get_items_by_user)

Routes.route("/api/items/:id").get(get_item_by_id)

Routes.route("/api/:userId/items/:id").delete(delete_item)

Routes.route("/api/users/:_id").get(get_user)

Routes.route("/api/users").get(get_users)

module.exports = Routes;