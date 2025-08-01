import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportsComponent from './components/ReportsComponent';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add a common Header or Sidebar component here if you want it to appear on all pages */}
        <Routes>

          <Route path="/" element={<DashboardPage />} />


          <Route path="/reports" element={<ReportsComponent />} />


        </Routes>
      </div>
    </Router>
  );
}


export default App;
