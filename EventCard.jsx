import React from 'react';
import { Calendar, MapPin, Users, Award, ShieldAlert } from 'lucide-react';

const EventCard = ({ event, user, onRegister, onEdit, onDelete }) => {
  const isDeadlinePassed = new Date() > new Date(event.registrationDeadline);
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedDeadline = new Date(event.registrationDeadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Decide status badge styling
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    ongoing: 'bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse',
    completed: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  const isRegistered = event.userRegistrationStatus; // we can inject this in parent component or fetch it
  const regStatus = event.registrationStatus; // 'pending' | 'approved' | 'rejected'

  return (
    <div className="bg-white rounded-2xl border border-slate-100 hover:border-blue-500/20 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full">
      <div className="p-6">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-100 text-slate-700 border border-slate-200">
            {event.sportType}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${statusColors[event.status]}`}>
            {event.status}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-extrabold text-slate-850 group-hover:text-blue-600 transition-colors text-lg line-clamp-2 mb-2">
          {event.title}
        </h4>

        {/* Description */}
        <p className="text-slate-500 text-sm line-clamp-3 mb-6">
          {event.description}
        </p>

        {/* Event Stats / Info */}
        <div className="space-y-3 text-slate-600 text-sm">
          <div className="flex items-center space-x-2.5">
            <Calendar className="h-4.5 w-4.5 text-blue-500 shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Users className="h-4.5 w-4.5 text-blue-500 shrink-0" />
            <span>Max slots: {event.maxParticipants} students</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col space-y-3 mt-auto">
        {/* Registration Deadline Warning */}
        {event.status === 'upcoming' && (
          <div className="flex items-center space-x-1.5 text-xs text-amber-600">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
            <span>Deadline: {formattedDeadline}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          {user?.role === 'admin' ? (
            <>
              <button
                onClick={() => onEdit && onEdit(event)}
                className="flex-1 bg-slate-200 hover:bg-slate-350 text-slate-800 font-semibold py-2 rounded-lg text-sm transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(event._id)}
                className="bg-red-50 hover:bg-red-100 text-red-650 p-2 rounded-lg text-sm transition-all"
                title="Delete Event"
              >
                Delete
              </button>
            </>
          ) : user ? (
            isRegistered ? (
              <div className={`w-full py-2 px-4 rounded-lg text-sm font-semibold text-center border uppercase tracking-wider ${
                regStatus === 'approved' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : regStatus === 'rejected'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                Registration: {regStatus}
              </div>
            ) : isDeadlinePassed ? (
              <button
                disabled
                className="w-full bg-slate-200 text-slate-400 cursor-not-allowed font-semibold py-2 rounded-lg text-sm"
              >
                Deadline Passed
              </button>
            ) : event.status === 'completed' ? (
              <button
                disabled
                className="w-full bg-slate-200 text-slate-400 cursor-not-allowed font-semibold py-2 rounded-lg text-sm"
              >
                Event Closed
              </button>
            ) : (
              <button
                onClick={() => onRegister && onRegister(event)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                Register for Event
              </button>
            )
          ) : (
            <a
              href="/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm text-center transition-all block hover:shadow-lg hover:shadow-blue-500/20"
            >
              Log In to Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
