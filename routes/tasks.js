const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Routes for tasks
router.get('/', taskController.getTasks); // List tasks (optional: with label filter)
router.post('/', taskController.createTask); // Create a task
router.put('/:id', taskController.updateTask); // Update a task
router.delete('/:id', taskController.deleteTask); // Delete a task

// Routes for task labels (assuming separate label service)
router.post('/:taskId/labels/:labelId', taskController.addLabelToTask); // Add label to a task
router.delete('/:taskId/labels/:labelId', taskController.removeLabelFromTask); // Remove label from a task

module.exports = router;
