var express = require('express');
const controller = require('../controllers');
const todosController = controller.todos;
const todoItemsController = controller.todoItems;
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send("Express is Good!");
});

module.exports = router;