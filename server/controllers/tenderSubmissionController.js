const TenderSubmission = require('../models/TenderSubmission');
const Tender = require('../models/Tender');

exports.submitTender = async (req, res) => {
  try {
    const { tenderId } = req.body;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'File is required' });
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