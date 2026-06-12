import React, { useState, useRef } from 'react';
import ProfileHeader from '../features/profile/components/ProfileHeader';
import EditProfile from '../features/profile/components/EditProfile';
import Settings from '../features/profile/components/Settings/Settings';
import FollowList from '../features/profile/components/FollowList';
import { PostGrid, VideoGrid, SavedItems, InfoSection } from '../features/profile/components/TabContents';
import GovernanceDashboard from '../features/governance/components/GovernanceDashboard';

type TabType = 'voice' | 'videos' | 'saved' | 'info' | 'governance';
type ViewType = 'profile' | 'edit' | 'settings' | 'champions' | 'allies';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('voice');
  const [currentView, setCurrentView] = useState<ViewType>('profile');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'voice': return <PostGrid />;
      case 'videos': return <VideoGrid />;
      case 'saved': return <SavedItems />;
      case 'info': return <InfoSection />;
      case 'governance': return <GovernanceDashboard />;
      default: return <PostGrid />;
    }
  };

  if (currentView === 'edit') {
    return (
      <EditProfile 
        onBack={() => setCurrentView('profile')} 
        profileImage={profileImage}
        triggerFileInput={triggerFileInput}
        handleImageChange={handleImageChange}
        fileInputRef={fileInputRef}
      />
    );
  }

  if (currentView === 'settings') {
    return <Settings onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'champions' || currentView === 'allies') {
    return <FollowList type={currentView === 'champions' ? 'champions' : 'allies'} onBack={() => setCurrentView('profile')} />;
  }

  return (
    <div className="min-h-screen bg-[#08060d] animate-in fade-in duration-500">
      <ProfileHeader 
        profileImage={profileImage}
        onEditClick={() => setCurrentView('edit')}
        onSettingsClick={() => setCurrentView('settings')}
        onChampionsClick={() => setCurrentView('champions')}
        onAlliesClick={() => setCurrentView('allies')}
      />
      
      {/* Navigation Tabs */}
      <div className="flex border-t border-slate-900 mt-12 overflow-x-auto scrollbar-none justify-center px-4 md:px-0">
        {[
          { id: 'voice', icon: 'fi-rr-grid', label: 'VOICE' },
          { id: 'videos', icon: 'fi-rr-play-alt', label: 'VIDEOS' },
          { id: 'saved', icon: 'fi-rr-bookmark', label: 'SAVED' },
          { id: 'info', icon: 'fi-rr-info', label: 'INFO' },
          { id: 'governance', icon: 'fi-rr-bank', label: 'GOVERNANCE' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 md:px-8 py-4 text-[10px] md:text-[11px] font-black tracking-[0.2em] transition-all relative ${
              activeTab === tab.id 
                ? 'text-white after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-white' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <i className={`fi ${tab.icon} flex items-center text-sm`}></i>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 mb-20 px-4 max-w-5xl mx-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Profile;
