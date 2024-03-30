const Task = require('../models/task');
const Label = require('../models/label'); // Import the Label model

const getAllTasks = async (userId, labelId) => {
  if (labelId) {
    const tasks = await Task.find({ userId, labels: labelId })
      .sort({ priority: 1, dueDate: 1 }); // Filter by label and sort
    return tasks;
  } else {
    return await Task.find({ userId })
      .sort({ priority: 1, dueDate: 1 }); // No label filter, sort as usual
  }
};

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, userId });
  return task;
};

const createTask = async (text, priority, dueDate, userId) => {
  const newTask = new Task({ text, priority, dueDate, userId });
  await newTask.save();
  return newTask;
};

const updateTask = async (id, updates, userId) => {
  const allowedUpdates = ['text', 'priority', 'dueDate', 'completed', 'inProgress']; // Add new fields
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    throw new Error('Invalid updates!');
  }
  const task = await Task.findOneAndUpdate({ _id: id, userId }, updates, { new: true, runValidators: true });
  return task;
};

const deleteTask = async (id, userId) => {
  const deletedTask = await Task.findByIdAndDelete({ _id: id, userId });
  return deletedTask;
};

const addTaskLabel = async (taskId, labelId, userId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  const label = await Label.findById(labelId); // Retrieve the label
  if (!task || !label) {
    return null; // Task or label not found
  }
  task.labels.push(label._id); // Add label reference to task
  await task.save();
  return task;
};

const removeTaskLabel = async (taskId, labelId, userId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    return null; // Task not found
  }
  const index = task.labels.indexOf(labelId);
  if (index !== -1) {
    task.labels.splice(index, 1); // Remove label reference
    await task.save();
  }
  return task;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  addTaskLabel,
  removeTaskLabel
};
