import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* Add other routes here, for example:
        <Route path="/reports" element={<ReportsPage />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
