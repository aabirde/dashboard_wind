import React, { useState, useEffect } from 'react';
import { getReports, createReport } from "../services/api";

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsData = await getReports();
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('Failed to fetch reports. Please try again later.'); // Set an error message
      }
    };

    fetchReports();
  }, []);

const handleCreateReport = async (turbine) => {
  try {
    const currentUserId = localStorage.getItem('user_id');
    const newReport = {
      user_id: currentUserId, // Should come from your auth state
      turbine_id: turbine.id, // Linking the report to the specific turbine
      title: `Maintenance Report for ${turbine.name}`,
      content: `Turbine ${turbine.name} (SN: ${turbine.serial_number}) 
                currently has a power output of ${turbine.current_power_output}kW 
                and efficiency of ${turbine.efficiency}%.`,
      report_type: 'performance'
    };
    
    await createReport(newReport);
    alert('Report created successfully!');
  } catch (error) {
    console.error('Error creating report:', error);
  }
};



  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {reports.map((report, idx) => (
          <li key={idx}>{JSON.stringify(report)}</li>
        ))}
      </ul>
      <button onClick={handleCreateReport}>Create Report</button>
    </div>
  );
};

export default ReportsComponent;