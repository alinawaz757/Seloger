const Routes = require("express").Router()
const { create_categories, get_categories, create_Transaction } = require("../controllers");

Routes.route("/api/categories")
    .post(create_categories)
    .get(get_categories)

Routes.route("/api/transactions")
    .post(create_Transaction)

module.exports = Routes;