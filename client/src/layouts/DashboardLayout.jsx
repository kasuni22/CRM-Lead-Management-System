import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-content">
          {children}
        </main>
        <footer className="dashboard-footer">
          <span>© 2026 CRM. All rights reserved.</span>
          <span className="dashboard-footer-meta"> · Built with MERN by Kasuni</span>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
