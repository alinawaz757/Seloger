const Routes = require("express").Router()
const {  get_categories } = require("../controllers");

Routes.route("/api/categories")
    
    .get(get_categories)

module.exports = Routes;