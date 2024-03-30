require('dotenv').config({ path: '.env' });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Consider using CORS for cross-origin requests (if applicable)
const jwt = require('jsonwebtoken'); // For JWT verification

const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/users');

const app = express();

const mongoUri = process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// View engine setup (EJS)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors middleware (optional)
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Secret key for JWT (replace with a strong, unique string)
const jwtSecret = process.env.JWT_SECRET;

// Middleware for JWT verification (optional, adjust as needed)
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Error verifying JWT:', err);
    res.status(401).send('Unauthorized');
  }
};

// Use the tasks router with JWT verification (adjust as needed)
app.use('/tasks', verifyJWT, tasksRouter);

// Use the user router
app.use('/user', userRouter);

// Handle any other routes (e.g., display the index page)
app.get('/', (req, res) => {
  res.render('index'); // Render the index view (modify to handle user data)
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
