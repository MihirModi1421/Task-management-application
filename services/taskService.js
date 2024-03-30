const Task = require('../models/task');

const getAllTasks = async () => {
  const tasks = await Task.find();
  return tasks;
};

const getTaskById = async (id) => {
  const task = await Task.findById(id);
  return task;
};

const createTask = async (text) => {
  const newTask = new Task({ text });
  await newTask.save();
  return newTask;
};

const updateTask = async (id, updates) => {
  const allowedUpdates = ['text', 'completed'];
  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    throw new Error('Invalid updates!');
  }
  const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  return task;
};

const deleteTask = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  return deletedTask;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
