// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import Dashboard from '../components/Dashboard';
// import Newbar from '../components/Navbar';

// const DashboardPage = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Newbar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
//           <Dashboard />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import React from 'react';
// Import Bootstrap components
import { Container } from 'react-bootstrap';
import Dashboard from '../components/Dashboard';
import Newbar from '../components/Navbar';

const DashboardPage = () => {
  return (
    /* d-flex flex-column: Stack navbar and content vertically
       vh-100: Ensure the page takes full viewport height
       bg-light: Replaces bg-gray-100 
    */
    <div className="d-flex flex-column vh-100 bg-light">
      
      {/* The Bootstrap Navbar */}
      <Newbar />

      {/* flex-grow-1: Take up remaining vertical space
         overflow-hidden: Prevent the main container from showing double scrollbars
      */}
      <div className="flex-grow-1 overflow-hidden d-flex flex-column">
        
        {/* main: The actual scrollable area
           overflow-auto: Enable scrolling for the dashboard content
           bg-body-secondary: Replaces bg-gray-200 (slightly darker than bg-light)
        */}
        <main className="flex-grow-1 overflow-auto bg-orange p-3 p-md-4">
          <Container fluid>
            <Dashboard />
          </Container>
        </main>

      </div>
    </div>
  );
};

export default DashboardPage;