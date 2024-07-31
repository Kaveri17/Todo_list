const {Todolist} = require('../models')

exports.createTodo = async (req,res) =>{
    const {title,description} = req.body
    // const userId = req.user.id

    try{
        const new_todo = await Todolist.create({
            title,
            description,
            // userId
        })
        res.json(new_todo)
    }
    catch(e){
        console.log(e)
        return res.status(400).json(e)
    }
}