import React, { useState, useEffect } from 'react';
import TurbineCard from './TurbineCard';
import LineChart from './LineChart';
import { getTurbines } from '../services/api';

const Dashboard = () => {
  const [turbines, setTurbines] = useState([]);

  useEffect(() => {
    const fetchTurbines = async () => {
      const data = await getTurbines();
      setTurbines(data);
    };
    fetchTurbines();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {turbines.map(turbine => (
          <TurbineCard key={turbine.id} turbine={turbine} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <LineChart />
      </div>
    </div>
  );
};

export default Dashboard;