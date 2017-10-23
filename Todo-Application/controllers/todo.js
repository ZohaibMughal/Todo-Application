const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

/**
 * Here we are sending a complete error object which is not a good practice as we 
 * are showing the structure of our object, So change it to something else
 */

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  findOrCreate(req,res){
    return Todo
    .findOrCreate({where:{id:req.params.todoId}, defaults:{title:'Default title'}})
    .then(todo => res.status(201).send(todo))
    .catch(error => res.status(400).send(error));
  },
  findAndCountAll(req,res){
    return Todo
    // .findAndCountAll({offset:5,limit:2})
    // .count() // returns total counts not object
    // .findAndCountAll({
    //   where:{ id:[1,2,3,4,5,6,7,8,9]}
    // })
    .findAndCountAll()
    .then(result => res.status(201).send(result))
    .catch(error => res.status(400).send(error));
  },
  list(req, res){
      return Todo
      // .max('id')
      // .sum('id')
      // .findAll({group:'id'})
      .findAll({
        where:{ 
          // id:{$notIn:[1,5,6,7,8]}
          // title:{ $ilike:"%LO"}
          // id:{$any:[1,5,6,7,8,10,11,12,13]}
          id:{
            $or:[{$lt:5},{$gt:13}]
          }
        }
      })
      .then(todos => res.status(200).send(todos))
      // .then(max => console.log(max))
      .catch(error => res.status(400).send(error));
  },
  retrieveIndividually(req, res){
    return Todo
    .findById(req.params.todoId)
    .then(todo => res.status(200).send(todo))
    .catch(error => res.status(400).send(error));
  },
  listWithItems(req, res) {
    return Todo
      .findAll({
        // where:{'$todoItems.id$':[5,6]},
        // include:{all:true},
        include: [{
          model: TodoItem,
          // required:true, // It will output only those enteries which have some relationshiop with other tables
          as: 'todoItems',
        //  where:{id:[5,6]} 
        // order:[['todoItems','id']]
        }],
        order:[['todoItems','id']]
        
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
    
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res){
    return Todo
    .findById(req.params.todoId, {
      include:[{
        model:TodoItem,
        as:"todoItems"
      }],
    })
    .then(todo => {
      if(!todo){
        return res.status(400).send({
          message: 'Todo Not Found',
        });
      }
      return todo
      .update(req.body, Object.keys(req.body))
      .then(() => res.status(200).send(todo))
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(200).send({
            message:"Todo is deleted",
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};