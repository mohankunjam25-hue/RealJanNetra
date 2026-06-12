import React from 'react';

interface FollowListProps {
  type: 'champions' | 'allies';
  onBack: () => void;
}

const FollowList: React.FC<FollowListProps> = ({ type, onBack }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-white hover:text-accent transition-colors">
          <i className="fi fi-rr-angle-left text-xl flex items-center"></i>
        </button>
        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em] capitalize">{type}</h2>
      </div>

      <div className="relative mb-10">
        <i className="fi fi-rr-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"></i>
        <input 
          type="text" 
          placeholder={`Search ${type}...`} 
          className="w-full bg-slate-900 border border-slate-800 rounded-[20px] pl-14 pr-6 py-4 text-white font-medium focus:border-accent outline-none transition-all shadow-inner" 
        />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-900/50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
                U{i}
              </div>
              <div>
                <p className="text-white font-black text-[15px]">User Name {i}</p>
                <p className="text-slate-500 text-xs font-bold">@username_{i}</p>
              </div>
            </div>
            <button className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              type === 'allies' 
                ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' 
                : 'bg-accent text-white hover:opacity-90 shadow-lg shadow-accent/20'
            }`}>
              {type === 'allies' ? 'Ally' : 'Champion'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowList;
