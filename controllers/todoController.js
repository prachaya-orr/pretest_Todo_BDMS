const { v4: uuidv4 } = require('uuid');
const { readTodo, writeTodo } = require('../services/fileFn');

exports.getAllTodos = async (req, res, next) => {
  try {
    const oldTodos = await readTodo();

    res.status(200).json({ todos: oldTodos, total: oldTodos.length });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed = false } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'title is required' });
    }

    if (typeof completed !== 'boolean') {
      return res
        .status(400)
        .json({ message: 'completed must be true or false' });
    }

    const newTodo = { title, completed, id: uuidv4() };
    const oldTodos = await readTodo();
    oldTodos.unshift(newTodo);
    await writeTodo(oldTodos);
    res.status(201).json({ todo: newTodo });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldTodos = await readTodo();
    const todo = oldTodos.find((item) => item.id === id) ?? null;

    res.json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.completedTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'completed must be a boolean' });
    }

    const oldTodos = await readTodo();

    let newTodo = {};

    for (item of oldTodos) {
      if (item.id === id) {
        newTodo = { title: item.title, completed: completed, id: item.id };
        console.log(newTodo);
      }
    }

    const newTodos = oldTodos.map((item) => (item.id === id ? newTodo : item));

    await writeTodo(newTodos);
    res.status(200).json({ todo: newTodo });
  } catch (err) {}
};

exports.updateTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'title is required' });
    }

    if (typeof completed !== 'boolean') {
      return res
        .status(400)
        .json({ message: 'completed must be true or false' });
    }

    const oldTodos = await readTodo();

    const newTodo = { title, completed, id };
    const newTodos = oldTodos.map((item) => (item.id === id ? newTodo : item));

    await writeTodo(newTodos);

    res.status(200).json({ todo: newTodo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodoById = exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldTodos = await readTodo();
    const newTodos = oldTodos.filter((item) => item.id !== id);

    await writeTodo(newTodos);

    res.status(200).json({ message: 'success delete' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldTodos = await readTodo();
    const newTodos = oldTodos.filter((item) => item.id !== id);

    await writeTodo(newTodos);

    res.status(200).json({ message: 'Delete done' });
  } catch (err) {
    next(err);
  }
};
