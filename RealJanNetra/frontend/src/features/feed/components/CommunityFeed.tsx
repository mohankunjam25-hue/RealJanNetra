import React from 'react';

const CommunityFeed: React.FC = () => {
  return (
    <section className="space-y-8 pt-4">
      <div className="flex items-center gap-2 mb-4 px-2">
        <h3 className="text-lg font-black text-white uppercase tracking-widest">
          <i className="fi fi-rr-users text-accent text-xl mr-3"></i>
          Community Posts
        </h3>
      </div>

      {[1, 2].map((post) => (
        <article key={post} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Post Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center font-black text-xl shadow-lg">U</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">Active Citizen</span>
                  <i className="fi fi-rr-badge-check text-blue-500 text-sm"></i>
                </div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Bhopal • 3h ago</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-white transition-all">
              <i className="fi fi-rr-menu-dots-vertical"></i>
            </button>
          </div>

          {/* Post Content */}
          <div className="px-6 pb-6">
            <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-medium">
              The local park maintenance has been excellent this month. Huge thanks to our Ward Councillor for taking quick action on the playground repair! #BhopalDevelopment #JanNetra
            </p>
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-[24px] flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-800 overflow-hidden group cursor-pointer">
              <i className="fi fi-rr-picture text-5xl group-hover:scale-110 transition-transform duration-500"></i>
            </div>
          </div>

          {/* Post Actions */}
          <div className="px-6 py-5 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-red-500 transition-all group">
                <i className="fi fi-rr-heart text-2xl group-hover:scale-110"></i>
                <span className="text-xs font-black">124</span>
              </button>
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-accent transition-all group">
                <i className="fi fi-rr-comment text-2xl group-hover:scale-110"></i>
                <span className="text-xs font-black">18</span>
              </button>
              <button className="flex items-center gap-2.5 text-slate-500 hover:text-blue-500 transition-all group">
                <i className="fi fi-rr-paper-plane text-2xl group-hover:rotate-12"></i>
              </button>
            </div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-accent/10 hover:text-accent transition-all">
              <i className="fi fi-rr-bookmark text-2xl"></i>
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default CommunityFeed;
