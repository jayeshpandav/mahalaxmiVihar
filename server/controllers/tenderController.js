const Tender = require('../models/Tender');

exports.createTender = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;
    const fileUrl = req.file ? req.file.path : undefined;
    
    // Parse dates properly to handle timezone issues
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    
    // Validate dates
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    
    if (parsedStartDate >= parsedEndDate) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }
    
    const tender = new Tender({
      title,
      description,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      fileUrl,
      createdBy: req.user.id
    });
    await tender.save();
    res.status(201).json(tender);
  } catch (err) {
    console.error('Create tender error:', err);
    res.status(500).json({ message: 'Failed to create tender' });
  }
};

exports.getTenders = async (req, res) => {
  try {
    const tenders = await Tender.find().sort({ createdAt: -1 });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tenders' });
  }
};

exports.getTenderById = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tender' });
  }
};

exports.deleteTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json({ message: 'Tender deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tender' });
  }
}; 