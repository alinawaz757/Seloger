const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.pluralize(false)
const cat_model = new Schema({
    type:{type:String},
    color:{type:String}
});
const user_model = new Schema({
    name:{type:String},
    email:{type:String},
    items:{type:Array, default:[]}   
})


const Categories = mongoose.model("categories",cat_model);
const users = mongoose.model("Users", user_model)

module.exports = {
    Categories,
    users
}