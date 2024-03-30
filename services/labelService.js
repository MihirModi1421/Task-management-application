const Label = require('../models/label');

const createLabel = async (name) => {
  const existingLabel = await Label.findOne({ name });
  if (existingLabel) {
    throw new Error('Label with that name already exists');
  }
  const newLabel = new Label({ name });
  await newLabel.save();
  return newLabel;
};

const getLabels = async () => {
  const labels = await Label.find();
  return labels;
};

const getLabelById = async (id) => {
  const label = await Label.findById(id);
  return label;
};

const deleteLabel = async (id) => {
  const deletedLabel = await Label.findByIdAndDelete(id);
  return deletedLabel;
};

module.exports = {
  createLabel,
  getLabels,
  getLabelById,
  deleteLabel,
};
