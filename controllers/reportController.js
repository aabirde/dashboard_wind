const { Report } = require('../models');

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const report = await Report.create({ userId, content });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

