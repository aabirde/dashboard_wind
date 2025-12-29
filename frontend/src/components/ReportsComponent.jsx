import React, { useState, useEffect } from 'react';
import { getReports, createReport, getTurbines } from "../services/api";

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);
  const [turbines, setTurbines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both reports and turbines on component mount
  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [reportsData, turbinesData] = await Promise.all([
          getReports(),
          getTurbines()
        ]);
        setReports(reportsData);
        setTurbines(turbinesData);
      } catch (err) {
        console.error('Error initializing data:', err);
        setError('Failed to load data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const handleCreateReport = async (turbine) => {
    if (!turbine) {
      alert("No turbine selected for the report.");
      return;
    }

    try {
      // Note: user_id is NOT included here because the backend 
      // extracts it from the JWT Authorization header
      const newReport = {
        turbine_id: turbine.id,
        title: `Maintenance Report for ${turbine.name || 'Unknown Turbine'}`,
        content: `Turbine ${turbine.name || 'N/A'} (SN: ${turbine.serial_number || 'N/A'}) 
                  currently has a power output of ${turbine.current_power_output || 0}kW 
                  and efficiency of ${turbine.efficiency || 0}%.`,
        report_type: 'performance',
        priority: 'medium',
        status: 'pending'
      };
      
      const createdReport = await createReport(newReport);
      
      // Update local state to show the new report immediately
      setReports(prev => [createdReport, ...prev]);
      alert('Report created successfully!');
    } catch (err) {
      console.error('Error creating report:', err);
      alert(`Failed to create report: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) return <div>Loading reports and turbines...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reports-container">
      <h2>Turbine Management</h2>
      <div className="turbine-actions" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {turbines.map((turbine) => (
          <button 
            key={turbine.id} 
            onClick={() => handleCreateReport(turbine)}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            Generate Report for {turbine.name}
          </button>
        ))}
      </div>

      <hr />

      <h2>Existing Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="reports-list">
          {reports.map((report) => (
            <li key={report.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
              <strong>{report.title}</strong> ({report.report_type})
              <p>{report.content}</p>
              <small>Status: {report.status} | Priority: {report.priority}</small>
              <br />
              <small>Date: {new Date(report.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsComponent;