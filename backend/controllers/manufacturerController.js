const { Turbine, User } = require('../models');
const { sequelize } = require('../models');

exports.getCumulativeStats = async (req, res) => {
  try {
    const totalPower = await Turbine.sum('current_power_output');
    const totalEnergy = await Turbine.sum('total_energy_generated');
    const operationalTurbines = await Turbine.count({where:{status:'operational'} });
    const totalTurbines = await Turbine.count();

    res.json({
      totalPower: totalPower || 0,
      totalEnergy: totalEnergy || 0,
      operationalTurbines,
      totalTurbines,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTurbineSpecificStats = async (req, res) => {
  try {
    const turbines = await Turbine.findAll({
      attributes: ['id', 'name', 'current_power_output', 'total_energy_generated', 'efficiency', 'status'],
    });
    res.json(turbines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserSpecificStats = async (req, res) => {
    try {
      const usersWithTurbines = await User.findAll({
        where: { role: 'client' },
        include: [{
          model: Turbine,
          as: 'turbines',
          attributes: ['id', 'name', 'current_power_output', 'status']
        }]
      });
      res.json(usersWithTurbines);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };