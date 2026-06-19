import React from 'react';
import { User, Trash2 } from 'lucide-react';

const TeamCard = ({ team, currentUser, onRemoveMember, onAddMemberClick }) => {
  const isCaptain = currentUser && team.captainId._id === currentUser.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between h-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-100">
            {team.sport}
          </span>
          <span className="text-slate-400 text-xs">
            Created on {new Date(team.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Team Name */}
        <h4 className="font-extrabold text-slate-800 text-lg mb-2">
          {team.name}
        </h4>

        {/* Captain Details */}
        <div className="mb-4 p-3 bg-slate-50 rounded-xl flex items-center space-x-3 border border-slate-100">
          <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs uppercase">
            {team.captainId.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Team Captain</p>
            <p className="text-sm font-bold text-slate-700">{team.captainId.name}</p>
          </div>
        </div>

        {/* Members List */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Members ({team.members.length})
          </p>
          {team.members.length === 0 ? (
            <p className="text-slate-400 text-sm italic py-2">No team members added yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
              {team.members.map((member) => (
                <li key={member._id} className="p-2.5 flex items-center justify-between bg-white text-sm">
                  <div className="flex items-center space-x-2.5">
                    <User className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-700">{member.name}</p>
                      <p className="text-slate-400 text-xs">{member.collegeId}</p>
                    </div>
                  </div>
                  {isCaptain && (
                    <button
                      onClick={() => onRemoveMember && onRemoveMember(team._id, member._id)}
                      className="text-slate-450 hover:text-red-650 p-1 rounded hover:bg-slate-100 transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Captain Actions */}
      {isCaptain && onAddMemberClick && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
          <button
            onClick={() => onAddMemberClick(team)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-all hover:shadow-lg hover:shadow-blue-500/20"
          >
            Add Team Member
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamCard;
