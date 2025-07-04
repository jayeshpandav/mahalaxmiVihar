const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

router.post('/', authenticateToken, authorizeRoles('admin'), upload.single('file'), tenderController.createTender);
router.get('/', tenderController.getTenders);
router.get('/:id', tenderController.getTenderById);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), tenderController.deleteTender);

module.exports = router; 