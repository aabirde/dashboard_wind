import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportsComponent from './components/ReportsComponent';
import DashboardPage from './pages/DashboardPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add a common Header or Sidebar component here if you want it to appear on all pages */}
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsComponent />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/manufacturer-dashboard" element={<ManufacturerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
