var express = require('express');
const controller = require('../controllers');
const todosController = controller.todos;
const todoItemsController = controller.todoItems;
var router = express.Router();

router.get('/', function(req, res){
    res.send({message: 'Welcome to the Todos API!'});
  }
);

  router.post('/todos', todosController.create);

  router.get('/todos', todosController.listWithItems);

  // router.get('/todos', todosController.list); // List only todos (Not with their associate items)

  router.get('/todos/:todoId', todosController.findOrCreate);

  router.put('/todos/:todoId', todosController.update);

  router.delete('/todos/:todoId', todosController.destroy);

  router.post('/todos/:todoId/todoItem', todoItemsController.create);

  router.get('/todoItems', todoItemsController.list);

  router.get('/todos/:todoId/todoItems/:todoItemId', todoItemsController.retrieve); // Not a good practice as we acan easily get this item with deep level = 1 eg. todoItems/id
  
  router.post('/todos/:todoId/todoItems/:todoItemId', todoItemsController.update);

  router.delete('/todos/:todoId/todoItems/:todoItemId', todoItemsController.destroy);

module.exports = router;