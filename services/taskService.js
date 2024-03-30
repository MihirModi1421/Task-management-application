const Task = require('../models/task');

const getAllTasks = async (userId) => {
  const tasks = await Task.find({ userId }); // Filter by userId
  return tasks;
};

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, userId }); // Filter by id and userId
  return task;
};

const createTask = async (text, userId) => {
  const newTask = new Task({ text, userId });
  await newTask.save();
  return newTask;
};

const updateTask = async (id, updates, userId) => {
  const allowedUpdates = ['text', 'completed'];
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
