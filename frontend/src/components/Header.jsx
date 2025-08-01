import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
      <div>
        {/* Add user profile, notifications, etc. here */}
      </div>
    </header>
  );
};

export default Header;