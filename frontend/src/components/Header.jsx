import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Navigation items configuration
  const navLinks = [
    { name: 'Home', path: '/welcome' },
    { name: 'Reports', path: '/reports' },
    { name: 'Diagnostics', path: '/diagnostics' },
  ];

  // Helper to determine active link styling
  const getLinkClass = (path) => {
    const baseClass = "text-[11px] font-black uppercase tracking-widest transition-all px-3 py-2 rounded-lg";
    return location.pathname === path 
      ? `${baseClass} text-blue-500 bg-slate-800/50` 
      : `${baseClass} text-slate-400 hover:text-white hover:bg-slate-800`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800 px-8 h-16 flex items-center justify-end">
      <div className="flex items-center gap-6">
        
        {/* Navigation Links Group */}
        <ul className="flex items-center gap-2 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className={getLinkClass(link.path)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-slate-800 mx-2"></div>

        {/* System Status & User Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Online
            </span>
          </div>

          <button 
            onClick={handleLogout}
            className="text-[11px] font-black uppercase tracking-widest px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95 border-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;