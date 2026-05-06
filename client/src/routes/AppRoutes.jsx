import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/Leads';
import AddLead from '../pages/AddLead';
import EditLead from '../pages/EditLead';
import LeadDetails from '../pages/LeadDetails';

// Components
import ProtectedRoute from '../components/ProtectedRoute';

// Layout
import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leads" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Leads />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leads/add" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AddLead />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leads/:id" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <LeadDetails />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leads/edit/:id" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EditLead />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
