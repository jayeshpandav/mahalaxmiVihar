const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const tenderSubmissionController = require('../controllers/tenderSubmissionController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const upload = multer({ storage });

router.post('/', authenticateToken, authorizeRoles('user'), upload.single('file'), tenderSubmissionController.submitTender);
router.get('/:tenderId', authenticateToken, authorizeRoles('admin'), tenderSubmissionController.getSubmissionsForTender);

module.exports = router; 