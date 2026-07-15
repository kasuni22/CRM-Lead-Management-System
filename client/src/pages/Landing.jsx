import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Landing.css';

const features = [
  {
    icon: '📈',
    title: 'Lead tracking & pipeline management',
    description: 'Keep every prospect organized with clear status flow and ownership from first touch to close.'
  },
  {
    icon: '📝',
    title: 'Notes & activity history',
    description: 'Capture team context and follow-up moments in one streamlined lead timeline.'
  },
  {
    icon: '💰',
    title: 'Deal value & performance dashboard',
    description: 'Monitor revenue potential and key metrics with the same polished reporting experience your team uses daily.'
  },
  {
    icon: '👥',
    title: 'Team assignment & ownership',
    description: 'Assign leads to the right people and keep responsibility visible across the full pipeline.'
  }
];

const stats = [
  { value: '500+', label: 'Leads tracked' },
  { value: '24/7', label: 'Pipeline visibility' },
  { value: '3x', label: 'Faster follow-ups' }
];

const Landing = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <Link to="/" className="landing-brand">
          <span className="landing-brand-dot" />
          CRM
        </Link>
        <div className="landing-nav-actions">
          <Link to="/login" className="landing-nav-link">
            Login
          </Link>
          <Link to="/register" className="landing-nav-cta">
            Get Started
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Modern sales operations</p>
            <h1>Manage your leads and sales pipeline with calm clarity.</h1>
            <p className="hero-subtitle">
              Replace scattered spreadsheets with a focused workspace for tracking opportunities,
              team ownership, and deal momentum.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="hero-primary-action">
                Get Started Free
              </Link>
              <a href="#features" className="hero-secondary-action">
                See how it works
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-card">
              <div className="hero-visual-top">
                <span className="chip chip-accent">Pipeline overview</span>
                <span className="chip">+12 this week</span>
              </div>
              <div className="hero-visual-grid">
                <div className="hero-panel hero-panel-large">
                  <div className="hero-panel-label">Qualified</div>
                  <div className="hero-panel-value">28</div>
                </div>
                <div className="hero-panel">
                  <div className="hero-panel-label">Won</div>
                  <div className="hero-panel-value">14</div>
                </div>
                <div className="hero-panel">
                  <div className="hero-panel-label">At risk</div>
                  <div className="hero-panel-value">3</div>
                </div>
              </div>
              <div className="hero-progress-row">
                <div className="hero-progress-pill" />
                <div className="hero-progress-pill hero-progress-pill-alt" />
                <div className="hero-progress-pill hero-progress-pill-muted" />
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Product highlights">
          {stats.map((stat) => (
            <div className="stat-pill" key={stat.label}>
              <div className="stat-pill-value">{stat.value}</div>
              <div className="stat-pill-label">{stat.label}</div>
            </div>
          ))}
        </section>

        <section id="features" className="features-section">
          <div className="section-heading">
            <p className="eyebrow">Built for momentum</p>
            <h2>A focused workspace for modern sales teams.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div>
            <p className="eyebrow">Start today</p>
            <h2>Bring your pipeline into a calmer, more productive workflow.</h2>
          </div>
          <Link to="/register" className="hero-primary-action">
            Create your account
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-grid">
          <div className="landing-footer-column">
            <Link to="/" className="landing-brand landing-footer-brand">
              <span className="landing-brand-dot" />
              CRM
            </Link>
            <p>Keep your pipeline calm, clear, and always moving.</p>
          </div>

          <div className="landing-footer-column">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="/dashboard">Dashboard</a>
            <a href="#">Pricing</a>
          </div>

          <div className="landing-footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Blog</a>
          </div>

          <div className="landing-footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span>© 2026 CRM. All rights reserved. · Built with MERN by Kasuni</span>
          <div className="landing-footer-socials" aria-label="Social links">
            <span>✦</span>
            <span>◌</span>
            <span>⬢</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
