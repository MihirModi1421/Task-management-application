require('dotenv').config({ path: '.env' });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const tasksRouter = require('./routes/tasks');

const app = express();

const mongoUri=process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose.connect(mongoUri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// View engine setup (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the tasks router for task-related routes
app.use('/tasks', tasksRouter);

// Handle any other routes (e.g., display the index page)
app.get('/', (req, res) => {
  res.render('index'); // Render the index view
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.APP_PORT || 3000; // Use environment variable for port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
