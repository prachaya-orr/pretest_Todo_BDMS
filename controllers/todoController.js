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
      return res.status(400).json({ message: 'completed must be a boolean' });
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
