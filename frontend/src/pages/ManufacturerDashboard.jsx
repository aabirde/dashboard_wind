import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManufacturerDashboard = () => {
  const [cumulativeStats, setCumulativeStats] = useState(null);
  const [turbineStats, setTurbineStats] = useState([]);
  const [userStats, setUserStats] = useState([]);

  const api = axios.create({
    baseURL: 'http://localhost:3002',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });


  useEffect(() => {
    const fetchData = async () => {
      const cumulative = await api.get('/manufacturer/cumulative-stats');
      setCumulativeStats(cumulative.data);

      const turbines = await api.get('/manufacturer/turbine-stats');
      setTurbineStats(turbines.data);

      const users = await api.get('/manufacturer/user-stats');
      setUserStats(users.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manufacturer Dashboard</h2>

      {cumulativeStats && (
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Total Power</h3>
            <p>{cumulativeStats.totalPower} kW</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Total Energy</h3>
            <p>{cumulativeStats.totalEnergy} kWh</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Operational Turbines</h3>
            <p>{cumulativeStats.operationalTurbines} / {cumulativeStats.totalTurbines}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Turbine Specific Stats</h3>
          <ul>
            {turbineStats.map(turbine => (
              <li key={turbine.id} className="border-b py-1">{turbine.name}: {turbine.current_power_output} kW ({turbine.status})</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">User Specific Stats</h3>
          {userStats.map(user => (
            <div key={user.id} className="mb-2">
              <h4 className="font-bold">{user.username}</h4>
              <ul>
                {user.turbines.map(turbine => (
                  <li key={turbine.id} className="ml-4">{turbine.name}: {turbine.current_power_output} kW</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;