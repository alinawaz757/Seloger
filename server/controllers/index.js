const model = require("../models/model")

const get_categories = async (req, res)=>{
    const data = await model.Categories.find();    
    return res.json(data)
}

module.exports = {
    get_categories
}