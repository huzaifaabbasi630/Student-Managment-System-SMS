import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/sonner';

import { DashboardPage } from './pages/Dashboard';
import { StudentsPage } from './pages/Students';
import { AttendancePage } from './pages/Attendance';
import { AdminRequests } from './pages/AdminRequests';
import { Signup } from './pages/Signup';

// Placeholder Pages
const Teachers = () => <div>Teacher Management Content</div>;
const Exams = () => <div>Exams & Results Content</div>;
const Fees = () => <div>Fee Management Content</div>;
const Notifications = () => <div>Notifications Content</div>;

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [showSignup, setShowSignup] = React.useState(false);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    if (showSignup) {
      return <Signup onBackToLogin={() => setShowSignup(false)} />;
    }
    return <Login onShowSignup={() => setShowSignup(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage />;
      case 'students': return <StudentsPage />;
      case 'teachers': return <Teachers />;
      case 'attendance': return <AttendancePage />;
      case 'exams': return <Exams />;
      case 'fees': return <Fees />;
      case 'notifications': return <Notifications />;
      case 'requests': return <AdminRequests />;
      default: return <DashboardPage />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}
