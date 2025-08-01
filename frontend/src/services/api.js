// Mock data for turbines
const mockTurbines = [
  { id: 1, name: 'Turbine A1', status: 'operational', current_power_output: 150.5, wind_speed: 12.3 },
  { id: 2, name: 'Turbine A2', status: 'maintenance', current_power_output: 0, wind_speed: 5.1 },
  { id: 3, name: 'Turbine B1', status: 'offline', current_power_output: 0, wind_speed: 0 },
];

export const getTurbines = async () => {
  // In a real application, you would fetch this from your backend API
  // For example:
  // const response = await fetch('http://localhost:3002/turbines');
  // const data = await response.json();
  // return data;

  return new Promise(resolve => setTimeout(() => resolve(mockTurbines), 500));
};