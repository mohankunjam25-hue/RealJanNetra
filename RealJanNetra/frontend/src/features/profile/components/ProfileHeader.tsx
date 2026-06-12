import React from 'react';
import Tooltip from '../../../shared/components/Tooltip';

interface ProfileHeaderProps {
  profileImage: string | null;
  onEditClick: () => void;
  onSettingsClick: () => void;
  onChampionsClick: () => void;
  onAlliesClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profileImage, 
  onEditClick, 
  onSettingsClick, 
  onChampionsClick, 
  onAlliesClick 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mb-10 px-4 pt-4">
      {/* Profile Photo */}
      <div className="relative group shrink-0">
        <div className="w-32 h-32 md:w-44 md:h-44 bg-slate-800 rounded-full border-2 border-slate-700 overflow-hidden flex items-center justify-center shadow-2xl transition-transform hover:scale-[1.02]">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl font-black text-white">V</span>
          )}
        </div>
        <button 
          onClick={onEditClick}
          className="absolute bottom-1 right-1 bg-accent p-2.5 rounded-full border-4 border-slate-950 text-white shadow-lg hover:scale-110 transition-all"
        >
          <i className="fi fi-rr-camera flex items-center"></i>
        </button>
      </div>

      {/* Profile Info & Stats */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Vel Quaro</h2>
          <span className="text-slate-400 text-lg">@vel_quaro</span>
          <Tooltip text="Verified Citizen" position="top">
            <i className="fi fi-rr-badge-check text-blue-500 text-xl mt-1"></i>
          </Tooltip>
          <div className="flex gap-2 ml-0 md:ml-4">
            <button 
              onClick={onEditClick}
              className="px-6 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors border border-slate-700"
            >
              Edit Profile
            </button>
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700">
              <i className="fi fi-rr-share flex items-center"></i>
            </button>
            <button 
              onClick={onSettingsClick}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
            >
              <i className="fi fi-rr-settings flex items-center"></i>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12 mb-6 border-y border-slate-900 md:border-none py-4 md:py-0 w-full md:w-auto justify-center md:justify-start">
          <div className="flex flex-col md:flex-row md:gap-1.5 items-center">
            <span className="font-black text-white">12</span>
            <span className="text-slate-400 text-sm md:text-base text-capitalize">Voice</span>
          </div>
          <button 
            onClick={onChampionsClick}
            className="flex flex-col md:flex-row md:gap-1.5 items-center hover:opacity-80 transition-opacity"
          >
            <span className="font-black text-white">1.2k</span>
            <span className="text-slate-400 text-sm md:text-base text-capitalize">Champions</span>
          </button>
          <button 
            onClick={onAlliesClick}
            className="flex flex-col md:flex-row md:gap-1.5 items-center hover:opacity-80 transition-opacity"
          >
            <span className="font-black text-white">340</span>
            <span className="text-slate-400 text-sm md:text-base text-capitalize">Allies</span>
          </button>
        </div>

        {/* Bio */}
        <div className="max-w-md px-4 md:px-0">
          <p className="text-white font-bold mb-1 text-center md:text-left">JanNetra Ambassador</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-4 text-center md:text-left">
            Passionate about social governance and rural development. Connecting the dots from local panchayats to central policies. 🇮🇳
          </p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
            {['Politics', 'Development', 'Schemes', 'Technology'].map(tag => (
              <span key={tag} className="text-xs font-bold text-accent hover:underline cursor-pointer">#{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest justify-center md:justify-start">
            <i className="fi fi-rr-calendar flex items-center"></i>
            Joined June 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
