const express = require('express');
const labelController = require('../controllers/labelController');

const router = express.Router();

router.post('/', labelController.createLabel);
router.get('/', labelController.getLabels);
router.get('/:id', labelController.getLabelById);
router.delete('/:id', labelController.deleteLabel);

module.exports = router;
