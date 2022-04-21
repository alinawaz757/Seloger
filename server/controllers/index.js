const model = require("../models/model")

const get_categories = async (req, res) => {
    const data = await model.Categories.find();
    return res.json(data)
}
const create_user = async (req, res) => {
    const { email, name } = req.body;
    if (!name || !email) return res.status(400).json("Message: Bad Request");
    const user = await model.users.findOne({ email: email })

    if (!user) {
        const create = await new model.users({
            name: name,
            email: email,
        })
        create.save((err) => {
            if (!err) return res.status(200).json(create)
            if (err) return res.status(500).json(`message: error while creating user ${err}`)

        })
    }

    if (user) return res.status(200).json({ message: `${user.email} logged in successfully`, _id: user._id })

}

const create_item = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.json("user not found")
    try {
        const user = await model.users.findByIdAndUpdate({ _id: id }, { $push: { items: req.body } }, { new: true })

        return res.status(200).json(user)
    } catch {
        err => {
            if (err) return res.send("error", err)
        }
    }
}

const get_user = async (req, res) => {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Bad request" })
    const user = await model.users.findOne({ _id: _id })
    if (user) return res.status(200).json(user)
    if (!user) return res.status(500).send("user not found")
}
const get_users = async (req, res) => {

    const users = await model.users.find()
    if (users) return res.status(200).json(users)
    if (!users) return res.status(500).send("no record found")
}
const get_items_by_user = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: "Bad request" })
    try {
        const user = await model.users.findById(id)
        if (!user) return res.status(400).json({ message: "products not found" })
        return res.status(200).json(user.items)
    } catch {
        err => {
            throw err;
        }
    }
}
const get_item_by_id = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "Bad request" })
    try {
        const users = await model.users.find()
        let itemsArray;
        users.forEach(user => {
            itemsArray = user.items.map(item => item)
        })
        const item = itemsArray.filter(item => item._id === id)
        if (Object.keys(item).length !== 1) return res.send({ message: "item not found" })
        return res.send(item)

    } catch {
        err => {
            return res.json(err)
        }
    }
}
const delete_item = async (req,res) => {
    const { userId,id } = req.params
    if (!id) return res.status(400).json({ message: "Bad request" })
    try{
        const item = await model.users.updateOne({_id:userId},{
            $pull:{"items":{_id:id}}
        })
        if(item.modifiedCount === 1)res.json("deleted successfully")
        if(item.modifiedCount < 1)res.json({message:"unable to delete"})
    }catch{err=>{
        return res.status(500).send(err)
    }}
}
module.exports = {
    get_categories,
    create_user,
    get_user,
    get_users,
    create_item,
    get_items_by_user,
    get_item_by_id,
    delete_item
}
