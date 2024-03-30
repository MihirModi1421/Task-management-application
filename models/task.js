const mongoose = require('mongoose');
const User = require('./user');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  inProgress: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users', // Reference the User model
  },
});

async function updateTaskCount(next) {
  const newTask = this; // Access the newly created task document
  const userId = newTask.userId;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask._id } }, // Add task ID to user's tasks array
      { new: true } // Return the updated user document
    );

    if (!user) {
      console.error('Error updating user tasks:', userId);
      // Handle potential error (e.g., user not found)
    }
  } catch (err) {
    console.error('Error updating user tasks:', err);
    // Handle other errors during update
  }

  next(); // Proceed with the original save operation
};

async function deleteTaskCount(next) {
  const deletedTask = this._conditions._id; // Access the task being deleted (assuming pre 'findOneAndDelete' hook)
  const userId = deletedTask.userId;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { tasks: deletedTask._id } }, // Remove task ID from user's tasks array
      { new: true } // Return the updated user document
    );

    if (!user) {
      console.error('Error updating user tasks:', userId);
      // Handle potential error (e.g., user not found)
    }
  } catch (err) {
    console.error('Error updating user tasks:', err);
    // Handle other errors during update
  }

  next(); // Proceed with the original delete operation
};

// Apply the middleware to the Task model's pre-hooks
taskSchema.pre('save', updateTaskCount);

taskSchema.pre('findOneAndDelete', deleteTaskCount);
taskSchema.pre('deleteOne', deleteTaskCount);

module.exports = mongoose.model('tasks', taskSchema);
