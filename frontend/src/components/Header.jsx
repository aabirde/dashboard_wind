import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title = "Overview" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-8 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
           <span className="text-slate-900">{title}</span>
        </h2>
      </div>

      <div className="flex items-center gap-8">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">System Online</span>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-medium">Administrator</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;