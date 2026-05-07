import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../layouts/DashboardLayout.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="dot"></span>
          CRM
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link" end>
          <span>📊</span>
          Dashboard
        </NavLink>
        <NavLink to="/leads" className="sidebar-link" end>
          <span>👥</span>
          Leads
        </NavLink>
        <NavLink to="/leads/add" className="sidebar-link">
          <span>➕</span>
          Add Lead
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span>🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
