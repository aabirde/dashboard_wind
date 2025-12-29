import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => 
    location.pathname === path 
      ? "bg-slate-700 text-white font-semibold" 
      : "text-slate-400 hover:text-white hover:bg-slate-800";

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800">
      <div className="p-8">
        <h1 className="text-xl font-black tracking-widest text-blue-500 uppercase">
          Wind Dashboard
        </h1>
      </div>
      
<nav className="flex flex-col px-4 space-y-4">
  <Link 
    to="/welcome" 
    className={`block w-full p-3 rounded-md transition-all text-sm ${isActive('/welcome')}`}
  >
    Return Home/
  </Link>

  <Link 
    to="/reports" 
    className={`block w-full p-3 rounded-md transition-all text-sm ${isActive('/reports')}`}
  >
    Reports Overview/
  </Link>
  
  <Link 
    to="/diagnostics" 
    className={`block w-full p-3 rounded-md transition-all text-sm ${isActive('/diagnostics')}`}
  >
    Turbine Diagnostics 
  </Link>
</nav>

      <div className="p-6 text-[10px] uppercase tracking-widest text-slate-600 font-bold">
        v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;