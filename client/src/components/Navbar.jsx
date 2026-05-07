import React from 'react';
import { useLocation } from 'react-router-dom';
import '../layouts/DashboardLayout.css';

const Navbar = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/leads':
        return 'Leads';
      case '/leads/add':
        return 'Add Lead';
      case `/leads/edit/${location.pathname.split('/')[3]}`:
        return 'Edit Lead';
      case `/leads/${location.pathname.split('/')[2]}`:
        return 'Lead Details';
      default:
        return 'CRM';
    }
  };

  return (
    <header className="navbar">
      <h1 className="page-title">{getPageTitle()}</h1>
      <div className="user-avatar">U</div>
    </header>
  );
};

export default Navbar;
