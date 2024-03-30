const Task = require('../models/task');

const getAllTasks = async (userId) => {
  const tasks = await Task.find({ userId })
    .sort({ priority: 1, dueDate: 1 }); // Sort by priority and dueDate
  return tasks;
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

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
