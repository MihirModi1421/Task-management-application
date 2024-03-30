const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.userId); // Filter tasks by the authenticated user's ID
    res.render('index', { tasks }); // Pass tasks to the view
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).send('Error getting tasks');
  }
};

exports.createTask = async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = await taskService.createTask(text, req.userId); // Associate the task with the current user
    res.redirect('/'); // Redirect to task list page
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
