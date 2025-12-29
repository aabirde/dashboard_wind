import React, { useState, useEffect } from 'react';
import TurbineCard from './TurbineCard';
import LineChart from './LineChart';
import { getTurbines } from '../services/api';

const Dashboard = () => {
  const [turbines, setTurbines] = useState([]);
  const [visibleStats, setVisibleStats] = useState({
    current_power_output: true,
    wind_speed: true,
    temperature: true,
    vibration_level: true,
  });

  useEffect(() => {
    const fetchTurbines = async () => {
      const data = await getTurbines();
      setTurbines(data);
    };
    fetchTurbines();
  }, []);

  // Calculate Fleet KPIs
  const totalOutput = turbines.reduce((sum, t) => sum + (t.current_power_output || 0), 0);
  const activeAlerts = turbines.filter(t => t.status !== 'operational').length;

    const handleStatToggle = (stat) => {
    setVisibleStats(prevStats => ({
      ...prevStats,
      [stat]: !prevStats[stat],
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Customize Stats</h3>
        <div className="flex space-x-4">
          {Object.keys(visibleStats).map(stat => (
            <label key={stat} className="flex items-center">
              <input
                type="checkbox"
                checked={visibleStats[stat]}
                onChange={() => handleStatToggle(stat)}
                className="mr-2"
              />
              {stat.replace(/_/g, ' ')}
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {turbines.map(turbine => (
          <TurbineCard key={turbine.id} turbine={turbine} visibleStats={visibleStats} />
        ))}
      </div>

      {/* Analytics Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Performance Trend</h3>
        <div className="h-64"><LineChart /></div>
      </div>
    </div>
  );
};

export default Dashboard;