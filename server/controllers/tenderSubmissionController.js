const TenderSubmission = require('../models/TenderSubmission');
const Tender = require('../models/Tender');

exports.submitTender = async (req, res) => {
  try {
    const { tenderId } = req.body;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'File is required' });
    }
    
    // Check if user has already submitted to this tender
    const existingSubmission = await TenderSubmission.findOne({
      tender: tenderId,
      user: req.user.id
    });
    
    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted to this tender' });
    }
    
    // Check tender closing date
    const tender = await Tender.findById(tenderId);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    if (new Date() > new Date(tender.endDate)) {
      return res.status(400).json({ message: 'Tender submission closed' });
    }
    
    const submission = new TenderSubmission({
      tender: tenderId,
      user: req.user.id,
      fileUrl: req.file.path
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    console.error('Submit tender error:', err);
    res.status(500).json({ message: 'Failed to submit tender' });
  }
};

exports.getSubmissionsForTender = async (req, res) => {
  try {
    const { tenderId } = req.params;
    const submissions = await TenderSubmission.find({ tender: tenderId }).populate('user', 'username');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};

// Get user's own submissions
exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await TenderSubmission.find({ user: req.user.id })
      .populate('tender', 'title description startDate endDate')
      .sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user submissions' });
  }
};

// Get specific submission by user
exports.getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await TenderSubmission.findById(submissionId)
      .populate('tender', 'title description')
      .populate('user', 'username');
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Check if user owns this submission or is admin
    if (submission.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submission' });
  }
}; 