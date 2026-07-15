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
import Landing from '../pages/Landing';

// Components
import ProtectedRoute from '../components/ProtectedRoute';

// Layout
import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
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

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
