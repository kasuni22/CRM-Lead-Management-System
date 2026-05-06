import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h2>Welcome back!</h2>
      <p>Here is an overview of your CRM performance.</p>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Leads</h3>
          <div className="card-value">124</div>
        </div>
        <div className="dashboard-card">
          <h3>New Leads</h3>
          <div className="card-value">18</div>
        </div>
        <div className="dashboard-card">
          <h3>Qualified Leads</h3>
          <div className="card-value">45</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
