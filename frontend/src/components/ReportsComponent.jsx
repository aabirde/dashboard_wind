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
        // Handle error
      }
    };

    fetchReports();
  }, []);

  const handleCreateReport = async () => {
    try {
      const newReport = { /* your report data */ };
      await createReport(newReport);
      // Refresh the reports list
    } catch (error) {
      // Handle error
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