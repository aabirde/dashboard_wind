import React from 'react';

const TurbineCard = ({ turbine, visibleStats }) => {
  const getStatusStyle = (status) => {
    const styles = {
      operational: 'bg-green-100 text-green-700',
      maintenance: 'bg-amber-100 text-amber-700',
      offline: 'bg-red-100 text-red-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{turbine.name}</h3>
            <p className="text-xs text-gray-400 font-mono tracking-tighter">ID: {turbine.serial_number || 'TRB-001'}</p>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(turbine.status)}`}>
            {turbine.status}
          </span>
        </div>

        <div className="space-y-5">
          {visibleStats.current_power_output && (
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-3xl font-black text-gray-900">{turbine.current_power_output}</span>
                <span className="text-xs font-bold text-gray-400 pb-1">kW OUTPUT</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full transition-all duration-500" 
                  style={{ width: `${(turbine.current_power_output / 2000) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-y-4 pt-2">
            {visibleStats.wind_speed && (
              <Metric label="Wind Speed: " value={`${turbine.wind_speed} m/s`} />
            )}
            {visibleStats.temperature && (
              <Metric label="Temperature: " value={`${turbine.temperature}°C`} />
            )}
            {visibleStats.vibration_level && (
              <Metric 
                label="Vibration: " 
                value={`${turbine.vibration_level} Hz`} 
                highlight={turbine.vibration_level > 5} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value, highlight }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
    <span className={`text-sm font-bold ${highlight ? 'text-red-500' : 'text-gray-700'}`}>{value}</span>
  </div>
);

export default TurbineCard;