const express = require('express')
const { createTodo, getAllTodolist, getUserTodoList, getATodo, updateTodo, deleteTodo } = require('../controllers/todolistController')
const { authorization } = require('../middlewares/authmiddleware')
const router = express.Router()

router.post('/todo/create',authorization,createTodo)
router.get('/todo/getalllist',getAllTodolist)
router.get('/todo/getusertodo',authorization,getUserTodoList)
router.get('/todo/getsingletodo/:id',authorization,getATodo)
router.put('/todo/updatetodo/:id',authorization,updateTodo)
router.delete('/todo/deletetodo/:id',authorization,deleteTodo)

module.exports = router