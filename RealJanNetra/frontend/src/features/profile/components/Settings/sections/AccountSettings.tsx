import React, { useState, useRef } from 'react';
import { useAppStore } from '../../../../../store/appStore';
import { SettingsSectionWrapper } from '../SettingsShared';

const AccountSettings: React.FC = () => {
  const { user, setUser } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Vel Quaro',
    username: user?.username || 'vel_quaro',
    bio: 'Social governance enthusiast',
    mobile: '+91 98765 43210',
    profileImage: user?.avatar || null
  });

  const [isSaving, setIsLoading] = useState(false);
  const [activeSubView, setActiveSubView] = useState<'main' | 'password' | 'delete'>('main');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      setUser({
        ...user,
        name: formData.fullName,
        username: formData.username,
        avatar: formData.profileImage || undefined
      });
    }
    setIsLoading(false);
    alert('Account updated successfully!');
  };

  if (activeSubView === 'password') {
    return (
      <SettingsSectionWrapper title="Change Password" desc="Update your security credentials.">
        <div className="p-4 space-y-4">
          <input type="password" placeholder="Current Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
          <input type="password" placeholder="New Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
          <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-accent outline-none" />
          <div className="flex gap-3 pt-4">
            <button onClick={() => setActiveSubView('main')} className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl uppercase tracking-widest text-xs">Cancel</button>
            <button onClick={() => setActiveSubView('main')} className="flex-[2] py-3 bg-accent text-white font-bold rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-accent/20">Update Password</button>
          </div>
        </div>
      </SettingsSectionWrapper>
    );
  }

  if (activeSubView === 'delete') {
    return (
      <SettingsSectionWrapper title="Delete Account" desc="This action is permanent and cannot be undone.">
        <div className="p-6 text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl">
            <i className="fi fi-rr-warning"></i>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Deleting your account will remove all your Voice posts, Allies connections, and Governance data. Please type your password to confirm.
          </p>
          <input type="password" placeholder="Confirm Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none" />
          <div className="flex gap-3">
            <button onClick={() => setActiveSubView('main')} className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl uppercase tracking-widest text-xs">Keep Account</button>
            <button className="flex-[2] py-3 bg-red-600 text-white font-bold rounded-xl uppercase tracking-widest text-xs shadow-lg shadow-red-600/20">Delete Permanently</button>
          </div>
        </div>
      </SettingsSectionWrapper>
    );
  }

  return (
    <SettingsSectionWrapper title="Account" desc="Manage and update your personal information.">
      <div className="p-4 space-y-6">
        
        {/* Profile Photo Upload */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-800/50">
          <div className="relative group">
            <div className="w-20 h-20 bg-slate-800 rounded-full border-2 border-slate-700 overflow-hidden flex items-center justify-center shadow-lg">
              {formData.profileImage ? <img src={formData.profileImage} className="w-full h-full object-cover" alt="" /> : <span className="text-2xl font-black text-white">V</span>}
            </div>
            <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
              <i className="fi fi-rr-camera text-white text-lg"></i>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Profile Photo</h4>
            <p className="text-[11px] text-slate-500 mb-3">Professional avatar for your JanNetra profile.</p>
            <button onClick={() => fileInputRef.current?.click()} className="text-accent text-[11px] font-black uppercase tracking-widest hover:underline transition-all">Change Photo</button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          </div>
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all text-sm" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">@</span>
              <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-white focus:border-accent outline-none transition-all text-sm" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Bio</label>
            <textarea 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all text-sm h-24 resize-none leading-relaxed" 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            ></textarea>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Mobile Number</label>
            <input 
              type="tel" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-all text-sm" 
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-accent text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? 'Saving Changes...' : 'Save All Changes'}
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setActiveSubView('password')} className="py-3 bg-slate-900 border border-slate-800 text-slate-400 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:text-white transition-all">
              <i className="fi fi-rr-lock mr-2"></i> Change Password
            </button>
            <button onClick={() => setActiveSubView('delete')} className="py-3 bg-slate-900 border border-slate-800 text-red-500/60 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-red-500/5 hover:text-red-500 transition-all">
              <i className="fi fi-rr-trash mr-2"></i> Delete Account
            </button>
          </div>
        </div>

      </div>
    </SettingsSectionWrapper>
  );
};

export default AccountSettings;
