const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);

router.get('/:id', todoController.getTodoById);
router.patch('/:id/complete', todoController.completedTodoById);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);

module.exports = router;
