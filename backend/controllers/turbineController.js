const { Turbine } = require('../models');

exports.getAllTurbines = async (req, res) => {
  try{
    const turbines = await Turbine.findAll();
    res.json(turbines);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};

exports.getTurbineById = async (req, res) => {
  try{
    const turbine = await Turbine.findByPk(req.params.id);
    if (!turbine) return res.status(404).json({ error: 'Turbine not found' });
    res.json(turbine);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};

