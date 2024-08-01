const {Todolist} = require('../models')

exports.createTodo = async (req,res) =>{
    const {title,description} = req.body
    const userId = req.user.id
    try{
        const new_todo = await Todolist.create({
            title,
            description,
            userId
        })
        res.json(new_todo)
    }
    catch(e){
        console.log(e)
        return res.status(400).json(e)
    }
}

// get all todolist
exports.getAllTodolist = async(req,res)=>{
    try{
        let todos = await Todolist.findAll({
            include:'user'
        })
        res.json(todos)
    }
    catch(err){
        res.status(500).json({ message: err.message })
        // return res.status(400).json({error: "Something went wrong"})
    }
} 

// get User's all todolist 
exports.getUserTodoList = async(req,res)=>{
    try{
        const userId = req.user.id
        let todos = await Todolist.findAll({
            where: {userId} ,
            include:'user'
        })
        if(!todos){
            return res.status(404).json({message:"No todos found for the user"})
        }
        res.json(todos)
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}

// get a single todo
exports.getATodo = async(req,res)=>{
    try{
        const todoId = req.params.id
        let todo = await Todolist.findByPk(todoId)
        if(!todo){
            return res.status(404).json({message:"Todo list not found"})
        }
        // checking if the todo belongs to the user
        if(todo.userId !== req.user.id){
            return res.status(403).json({ message: 'Access forbidden' })
        }
        res.json(todo)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

// update the todolist
exports.updateTodo = async(req,res)=>{
    try{
        const todoId = req.params.id
        const {title,description,status}= req.body
        let todo = await Todolist.findByPk(todoId)
        if(!todo){
            return res.status(404).json({message: "Todo list not found"})
        }
        if(todo.userId !== req.user.id){
            return res.status(403).json({message:"Access forbidden"})
        }
        await todo.update({title, description,status})
        res.json(todo)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

// delete a todolist 
exports.deleteTodo = async(req,res)=>{
    try{
        const todoId = req.params.id
        let todo = await Todolist.findByPk(todoId)
        if(!todo){
            return res.status(404).json({message:"Todo List not found"})
        }
        if(todo.userId !== req.user.id){
            return res.status(403).json({message:"Acces forbidden"})
        }
        await todo.destroy()
        res.status(200).send({message:"Todo Deleted"})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}