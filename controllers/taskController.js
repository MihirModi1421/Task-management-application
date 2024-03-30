const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const { labelId } = req.query; // Optional query parameter for label filtering
    const tasks = await taskService.getAllTasks(req.userId, labelId); // Filter by user ID and optional label
    // res.render('index', { tasks }); // Pass tasks to the view
    res.json({ tasks }); // Send tasks as JSON response
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).send('Error getting tasks');
  }
};

exports.createTask = async (req, res) => {
  const { text, priority, dueDate, labels } = req.body; // Include labels property in request body
  try {
    const newTask = await taskService.createTask(text, priority, dueDate, req.userId, labels); // Pass labels to createTask
    // res.redirect('/'); // Redirect to task list page
    res.json(newTask); // Send newly created task as JSON response
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Error creating task');
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTask = await taskService.updateTask(id, updates, req.userId); // Check task ownership before updating
    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(updatedTask); // Send updated task as JSON response
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Error updating task');
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await taskService.deleteTask(id, req.userId); // Check task ownership before deleting
    if (!deletedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(deletedTask); // Send deleted task as JSON response
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Error deleting task');
  }
};

// New function for adding labels to a task
exports.addLabelToTask = async (req, res) => {
  const { taskId, labelId } = req.params;
  try {
    const updatedTask = await taskService.addTaskLabel(taskId, labelId, req.userId); // Check ownership before adding label
    if (!updatedTask) {
      return res.status(404).send('Task or label not found');
    }
    res.json(updatedTask); // Send updated task with added label as JSON response
  } catch (err) {
    console.error('Error adding label to task:', err);
    res.status(500).send('Error adding label to task');
  }
};

// New function for removing labels from a task
exports.removeLabelFromTask = async (req, res) => {
  const { taskId, labelId } = req.params;
  try {
    const updatedTask = await taskService.removeTaskLabel(taskId, labelId, req.userId); // Check ownership before removing label
    if (!updatedTask) {
      return res.status(404).send('Task or label not found');
    }
    res.json(updatedTask); // Send updated task with removed label as JSON response
  } catch (err) {
    console.error('Error removing label from task:', err);
    res.status(500).send('Error removing label from task');
  }
};
