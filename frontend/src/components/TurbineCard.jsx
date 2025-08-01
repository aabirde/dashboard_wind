import React from 'react';

const TurbineCard = ({ turbine }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{turbine.name}</h3>
        <span className={`px-2 py-1 text-xs text-white rounded-full ${getStatusColor(turbine.status)}`}>
          {turbine.status}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{turbine.current_power_output} kW</p>
        <p className="text-sm text-gray-500">Current Power Output</p>
      </div>
      <div className="mt-2">
        <p className="text-lg">{turbine.wind_speed} m/s</p>
        <p className="text-sm text-gray-500">Wind Speed</p>
      </div>
    </div>
  );
};

export default TurbineCard;