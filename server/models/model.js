const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cat_model = new Schema({
    type:{type:String},
    color:{type:String}
});



const Categories = mongoose.model("categories",cat_model);


module.exports = {
    Categories
}