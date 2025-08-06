import React, { useState, useEffect } from 'react';
import { getTurbines } from '../services/api';

const DiagnosticsPage = () => {
  const [turbines, setTurbines] = useState([]);

  useEffect(() => {
    const fetchTurbines = async () => {
      const data = await getTurbines();
      setTurbines(data);
    };
    fetchTurbines();
  }, []);

  const getFaultyTurbines = () => {
    return turbines.filter(turbine => turbine.status === 'offline' || turbine.status === 'error');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Turbine Diagnostics</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Faulty Turbines</h3>
        <ul>
          {getFaultyTurbines().map(turbine => (
            <li key={turbine.id} className="border-b py-2">
              <span className="font-semibold">{turbine.name}</span> - Status: {turbine.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiagnosticsPage;