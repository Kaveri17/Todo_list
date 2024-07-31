const express = require('express')
const { createTodo } = require('../controllers/todolistController')
const { authorization } = require('../services/userServices')
const router = express.Router()

// router.post('/create/todo',authorization,createTodo)
router.post('/create/todo',createTodo)


module.exports = router