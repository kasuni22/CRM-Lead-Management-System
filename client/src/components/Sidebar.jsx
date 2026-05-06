import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../layouts/DashboardLayout.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>CRM Logo</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link" end>
          Dashboard
        </NavLink>
        <NavLink to="/leads" className="sidebar-link" end>
          Leads
        </NavLink>
        <NavLink to="/leads/add" className="sidebar-link">
          Add Lead
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
