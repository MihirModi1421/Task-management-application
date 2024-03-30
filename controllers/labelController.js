const labelService = require('../services/labelService');

exports.createLabel = async (req, res) => {
  const { name } = req.body;
  try {
    const newLabel = await labelService.createLabel(name);
    res.json(newLabel);
  } catch (err) {
    console.error('Error creating label:', err);
    res.status(400).send(err.message); // Send specific error message
  }
};

exports.getLabels = async (req, res) => {
  try {
    const labels = await labelService.getLabels();
    res.json(labels);
  } catch (err) {
    console.error('Error getting labels:', err);
    res.status(500).send('Error retrieving labels');
  }
};

exports.getLabelById = async (req, res) => {
  const { id } = req.params;
  try {
    const label = await labelService.getLabelById(id);
    if (!label) {
      return res.status(404).send('Label not found');
    }
    res.json(label);
  } catch (err) {
    console.error('Error getting label:', err);
    res.status(500).send('Error retrieving label');
  }
};

exports.deleteLabel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLabel = await labelService.deleteLabel(id);
    if (!deletedLabel) {
      return res.status(404).send('Label not found');
    }
    res.json(deletedLabel);
  } catch (err) {
    console.error('Error deleting label:', err);
    res.status(500).send('Error deleting label');
  }
};
