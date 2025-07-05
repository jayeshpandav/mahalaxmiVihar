const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const tenderSubmissionController = require('../controllers/tenderSubmissionController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

const upload = multer({ storage });

router.post('/', authenticateToken, authorizeRoles('user'), upload.single('file'), tenderSubmissionController.submitTender);
router.get('/:tenderId', authenticateToken, authorizeRoles('admin'), tenderSubmissionController.getSubmissionsForTender);

// User's own submissions
router.get('/user/submissions', authenticateToken, authorizeRoles('user'), tenderSubmissionController.getUserSubmissions);

// Get specific submission (for file viewing)
router.get('/submission/:submissionId', authenticateToken, tenderSubmissionController.getSubmissionById);

module.exports = router; 