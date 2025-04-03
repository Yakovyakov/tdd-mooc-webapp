const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const { pool, checkConnection } = require('./config/db');

const TodoService = require('./services/todoService');
const PostgresTodoStore = require('./models/stores/postgresTodoStore');
const TodoController = require('./controllers/todoController');
const Todo = require('./models/Todo');

const todoRoutes = require('./routes/todoRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

const postgressTodoStore = new PostgresTodoStore(pool);
const todoModel = new Todo(postgressTodoStore);
const todoService = new TodoService(todoModel);
const todoController = new TodoController(todoService);
// config routes


app.use('/todos', todoRoutes(todoController));

app.get('/api/health', async (req, res) => {
  const dbStatus = await checkConnection();
  

  res.json({
    status: 'OK',
    dbStatus: dbStatus ? "connected" : "disconnected", 
    timestamp: new Date().toISOString()
  });
});

module.exports = app;