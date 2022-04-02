const conn = require("../db/connection")
const model = require("../models/model")

// Create Categories
const create_categories =async (req, res) => {
    const create = new model.Categories({
        type:"expense",
        color:"red"
    })
    await create.save(err=>{
        if(err)return res.status(400).json(`message: error while creating categories: ${err}`)
        return res.status(200).json(create)
    })
}

// Get Categories
const get_categories = async (req, res)=>{
    
    const data = await model.Categories.find();
    // const filter = data.map(item=>Object.assign({},{type:item.type, color:item.color}))
    
    return res.json(data)
}

//Create Transaction
const create_Transaction = async (req, res) => {
    const {name, type, amount} = req.body;
    const Transaction = new model.Transactions({
        name:name,
        type:type,
        amount

    })
    Transaction.save(err => {
        if(err) return console.log("err", err)
        return res.json(Transaction)
    })
}
module.exports = {
    create_categories,
    get_categories,
    create_Transaction
}