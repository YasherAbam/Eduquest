import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/user/auth/login';
import ForgotPassword from './components/user/auth/forgotpassword';
import ResetPassword from './components/user/auth/resetpassword';
import Terms from './components/user/auth/terms';
import Signup from './components/user/auth/signup';
import AdminDashboard from './components/admin/dashboard/admindashboard';
import AdminAboutUs from './components/admin/system/adminaboutus';
import AdminFAQs from './components/admin/system/adminfaqs';
import AdminSettings from './components/admin/system/adminsettings';
import AdminHelp from './components/admin/system/adminhelp';
import AdminPrivacy from './components/admin/system/adminprivacy';
import AdminTerms from './components/admin/system/adminterms';
import UserDashboard from './components/user/dashboard/userdashboard';
import Admin2Dashboard from './components/admin2/dashboard2/admin2dashboard';
import Requirements from './components/user/requirements/user-requirements';
import AdminRequirements from './components/admin/system/adminrequirements';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-aboutus" element={<AdminAboutUs />} />
        <Route path="/admin-FAQs" element={<AdminFAQs />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/help" element={<AdminHelp />} />
        <Route path="/privacy" element={<AdminPrivacy />} />
        <Route path="/terms" element={<AdminTerms />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin2-dashboard" element={<Admin2Dashboard />} />
        <Route path="/user-requirements" element={<Requirements />} />
        <Route path="/admin-requirements" element={<AdminRequirements />} />

        
        {/* 404 catch-all route */}
        <Route path="*" element={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
          }}>
            <h1>404 - Page Not Found</h1>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;