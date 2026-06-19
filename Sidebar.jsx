import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Trophy,
  Megaphone,
  User,
  Settings,
  ShieldCheck,
  FileText,
  Grid
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const isStudent = user.role === 'student';
  const isCaptain = user.role === 'captain';
  const isAdmin = user.role === 'admin';

  // Base API upload path
  const profilePhotoUrl = user.profilePhoto 
    ? (user.profilePhoto.startsWith('data:') ? user.profilePhoto : `http://localhost:5000${user.profilePhoto}`)
    : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';


  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-screen flex flex-col transition-all">
      {/* User Info Block */}
      <div className="p-6 border-b border-slate-800 flex flex-col items-center text-center">
        <img
          src={profilePhotoUrl}
          alt={user.name}
          className="h-16 w-16 rounded-full border-2 border-blue-500 object-cover mb-3"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
          }}
        />
        <h3 className="font-bold text-white tracking-wide text-sm">{user.name}</h3>
        <p className="text-slate-400 text-xs mt-1">ID: {user.collegeId}</p>
        <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
          isAdmin 
            ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
            : isCaptain 
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
            : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
        }`}>
          {user.role}
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {/* Common Dashboard Overview */}
        <NavLink
          to={isAdmin ? '/admin-dashboard' : '/student-dashboard'}
          end
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard Overview</span>
        </NavLink>

        {/* Common Events Navigation */}
        <NavLink
          to="/events"
          className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Calendar className="h-5 w-5" />
          <span>View Events</span>
        </NavLink>

        {/* Student & Captain Links */}
        {(isStudent || isCaptain) && (
          <>
            <NavLink
              to="/my-teams"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Users className="h-5 w-5" />
              <span>My Teams</span>
            </NavLink>

            {isCaptain && (
              <NavLink
                to="/submit-scores"
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Trophy className="h-5 w-5" />
                <span>Submit Score</span>
              </NavLink>
            )}
          </>
        )}

        {/* Admin Links */}
        {isAdmin && (
          <div className="border-t border-slate-800 my-4 pt-4">
            <p className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Admin Modules</p>
            
            <NavLink
              to="/admin/sports"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Grid className="h-5 w-5" />
              <span>Manage Sports</span>
            </NavLink>

            <NavLink
              to="/admin/events"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Calendar className="h-5 w-5" />
              <span>Manage Events</span>
            </NavLink>

            <NavLink
              to="/admin/registrations"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <ShieldCheck className="h-5 w-5" />
              <span>Approvals Queue</span>
            </NavLink>

            <NavLink
              to="/admin/results"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Trophy className="h-5 w-5" />
              <span>Results & Scores</span>
            </NavLink>

            <NavLink
              to="/admin/announcements"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Megaphone className="h-5 w-5" />
              <span>Announcements</span>
            </NavLink>
          </div>
        )}

        {/* Common Settings/Profile Link */}
        <div className="border-t border-slate-800 my-4 pt-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <User className="h-5 w-5" />
            <span>Profile Settings</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
