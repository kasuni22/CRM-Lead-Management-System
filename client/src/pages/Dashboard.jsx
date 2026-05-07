import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    newLeads: 0,
    qualified: 0,
    wonLeads: 0,
    lostLeads: 0,
    totalDealValue: 0,
    totalWonDealValue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/leads");

      const leads = res.data;

      const total = leads.length;

      const newLeads = leads.filter(
        (lead) => lead.status === "New"
      ).length;

      const qualified = leads.filter(
        (lead) => lead.status === "Qualified"
      ).length;

      const wonLeads = leads.filter(
        (lead) => lead.status === "Won"
      ).length;

      const lostLeads = leads.filter(
        (lead) => lead.status === "Lost"
      ).length;

      const totalDealValue = leads.reduce(
        (sum, lead) => sum + (lead.dealValue || 0),
        0
      );

      const totalWonDealValue = leads
        .filter((lead) => lead.status === "Won")
        .reduce((sum, lead) => sum + (lead.dealValue || 0), 0);

      setStats({
        total,
        newLeads,
        qualified,
        wonLeads,
        lostLeads,
        totalDealValue,
        totalWonDealValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="dashboard-title">Welcome back!</h1>
      <p className="dashboard-subtitle">
        Here is an overview of your CRM performance.
      </p>

      {stats.total === 0 ? (
        <div className="empty-state-card">
          <h2>Start tracking leads today</h2>
          <p>
            Your dashboard is waiting. Add your first lead to begin measuring sales activity,
            pipeline movement, and deal value.
          </p>
          <Link to="/leads/add" className="form-button">
            Add your first lead
          </Link>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99,102,241,0.2)' }}>
              <span>📊</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Leads</p>
              <h2 className="stat-value">{stats.total}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.2)' }}>
              <span>🆕</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">New Leads</p>
              <h2 className="stat-value">{stats.newLeads}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.2)' }}>
              <span>✅</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Qualified Leads</p>
              <h2 className="stat-value">{stats.qualified}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(34,197,94,0.2)' }}>
              <span>🏆</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Won Leads</p>
              <h2 className="stat-value">{stats.wonLeads}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.2)' }}>
              <span>❌</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Lost Leads</p>
              <h2 className="stat-value">{stats.lostLeads}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.2)' }}>
              <span>💰</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Deal Value</p>
              <h2 className="stat-value">${stats.totalDealValue.toLocaleString()}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(34,197,94,0.2)' }}>
              <span>💎</span>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Won Deal Value</p>
              <h2 className="stat-value">${stats.totalWonDealValue.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}