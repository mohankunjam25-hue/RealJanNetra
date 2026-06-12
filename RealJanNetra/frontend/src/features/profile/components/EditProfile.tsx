import React from 'react';

interface EditProfileProps {
  onBack: () => void;
  profileImage: string | null;
  triggerFileInput: () => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const EditProfile: React.FC<EditProfileProps> = ({ 
  onBack, 
  profileImage, 
  triggerFileInput, 
  handleImageChange, 
  fileInputRef 
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="text-white hover:text-accent flex items-center gap-2 font-bold transition-colors">
          <i className="fi fi-rr-angle-left flex items-center text-lg"></i> Back
        </button>
        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Edit Profile</h2>
        <button onClick={onBack} className="text-accent font-black uppercase tracking-widest text-sm hover:opacity-80 transition-opacity">Save</button>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative group mb-4">
          <div className="w-28 h-24 bg-slate-800 rounded-full border-2 border-slate-700 overflow-hidden flex items-center justify-center shadow-xl">
            {profileImage ? (
              <img src={profileImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-black text-white">V</span>
            )}
          </div>
          <div 
            onClick={triggerFileInput}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
          >
            <i className="fi fi-rr-camera text-white text-xl"></i>
          </div>
        </div>
        <button onClick={triggerFileInput} className="text-accent text-xs font-black uppercase tracking-widest hover:underline transition-all">Change Profile Photo</button>
        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
      </div>

      <div className="space-y-6">
        {[
          { label: 'Name', value: 'Vel Quaro' },
          { label: 'Username', value: '@vel_quaro' },
          { label: 'Bio', value: 'Passionate about social governance and rural development. Connecting the dots from local panchayats to central policies.', type: 'textarea' },
          { label: 'State', value: 'Jharkhand' },
          { label: 'District', value: 'Ranchi' },
          { label: 'Village', value: 'Mesra' }
        ].map(field => (
          <div key={field.label}>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea 
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white font-medium focus:border-accent outline-none transition-all h-32 resize-none leading-relaxed text-sm shadow-inner" 
                defaultValue={field.value}
              ></textarea>
            ) : (
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white font-medium focus:border-accent outline-none transition-all text-sm shadow-inner" 
                defaultValue={field.value} 
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-900">
        <button className="w-full py-4 bg-slate-900 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl border border-slate-800 hover:border-red-500/30 hover:text-red-500 transition-all">
          Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
