const { Report } = require('../models');

exports.getReports = async (req, res) => {
  try {
const userId = req.user?.user?.id; 

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found in token" });
    }

    // Filter reports to only show those belonging to this user
    const reports = await Report.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']] // Optional: show newest first
    });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReport = async (req, res) => {
  try {

    const { turbine_id, title, content, report_type } = req.body;
    const user_id = req.user?.user?.id;
    if (!user_id) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }
    const report = await Report.create({ user_id, turbine_id, title, content, report_type });
    res.status(201).json(report);
  } catch (err) {
    console.error("Sequelize Error Details:", err);
    res.status(400).json({ error: err.message });
  }
};

