import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Newbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/welcome');
  };

  // Helper to determine if a path is active for Bootstrap's 'active' prop
  const checkActive = (path) => location.pathname === path;

  return (
    <Navbar bg="primary-subtle" data-bs-theme="dark" expand="lg" className="border-bottom border-slate-200 sticky-top py-2">
      <Container fluid className="px-5">
        {/* Navbar.Brand removed to remove logos as requested */}
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ms-auto aligns the Nav items to the right */}
          <Nav className="ms-auto align-items-center gap-4">
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={checkActive('/dashboard')}
              className="text-uppercase tracking-widest font-white text-[11px] py-3"
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/reports" 
              active={checkActive('/reports')}
              className="text-uppercase tracking-widest font-white text-[11px] py-3"
            >
              Reports
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/about" 
              active={checkActive('/about')}
              className="text-uppercase tracking-widest text-[11px] py-3"
            >
              About
            </Nav.Link>
            


            {/* Logout Action */}
            <button 
              onClick={handleLogout}
              className="text-[11px] font-white uppercase tracking-widest px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm border-0"
            >
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Newbar;


