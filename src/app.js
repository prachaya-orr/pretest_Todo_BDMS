require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const notFoundMiddleware = require('../middlewares/notFound');
const errorMiddleware = require('../middlewares/error');
const todoRouter = require('../routes/todoRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`\n\n\nserver running on port: ${port}`));
