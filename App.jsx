import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { PublicLayout, DashboardLayout } from './components/Layouts';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Results from './pages/Results';

// Dashboard / Private Pages
import StudentDashboard from './pages/StudentDashboard';
import MyTeams from './pages/MyTeams';
import SubmitScores from './pages/SubmitScores';
import ProfileSettings from './pages/ProfileSettings';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminSports from './pages/AdminSports';
import AdminEvents from './pages/AdminEvents';
import AdminApprovals from './pages/AdminApprovals';
import AdminResults from './pages/AdminResults';
import AdminAnnouncements from './pages/AdminAnnouncements';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/results" element={<Results />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Student & Captain Dashboard Routes */}
          <Route element={<DashboardLayout allowedRoles={['student', 'captain']} />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/my-teams" element={<MyTeams />} />
            <Route path="/submit-scores" element={<SubmitScores />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route element={<DashboardLayout allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/sports" element={<AdminSports />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/registrations" element={<AdminApprovals />} />
            <Route path="/admin/results" element={<AdminResults />} />
            <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          </Route>

          {/* General Auth Dashboard Route (accessible by all logged in roles) */}
          <Route element={<DashboardLayout allowedRoles={['student', 'captain', 'admin']} />}>
            <Route path="/profile" element={<ProfileSettings />} />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
