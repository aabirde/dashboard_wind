import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">Wind Dashboard</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="/welcome" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md">
              <span className="mr-3"></span>
              Return Home
            </a>
          </li>
          <li className="mb-4">
            <a href="/reports" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-md">
              <span className="mr-3"></span>
              Reports
            </a>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;