const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.render('index', { tasks }); // Render the index view with tasks data
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).send('Error getting tasks');
  }
};

exports.createTask = async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = await taskService.createTask(text);
    res.redirect('/'); // Redirect back to the task list page
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Error creating task');
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTask = await taskService.updateTask(id, updates);
    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(updatedTask); // Assuming API response here (change to render if needed)
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Error updating task');
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(deletedTask); // Assuming API response here (change to render if needed)
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Error deleting task');
  }
};
