const TodoItem = require('../models').TodoItem;


/**
 * Here we are sending a complete error object which is not a good practice as we 
 * are showing the structure of our object, So change it to something else
 */

 
module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
  list(req,res){
    return TodoItem
    .all()
    .then(todoItems => res.status(200).send(todoItems))
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return TodoItem
    .find({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId,
      },
    })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
        return res.status(200).send(todoItem);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return TodoItem
      .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
          .update(req.body, Object.keys(req.body))
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res) {
    return TodoItem
      .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
          .destroy()
          .then(() => res.status(200).send({
            message:"TodoItem is deleted",
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};