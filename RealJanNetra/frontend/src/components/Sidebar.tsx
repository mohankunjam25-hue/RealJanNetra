import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: 'fi-rr-home', label: 'Home', path: '/' },
    { icon: 'fi-rr-play', label: 'Shorts', path: '/shorts' },
    { icon: 'fi-rr-apps', label: 'Subscriptions', path: '/subscriptions' },
    { divider: true },
    { label: 'Library', header: true },
    { icon: 'fi-rr-folder', label: 'Your Files', path: '/files' },
    { icon: 'fi-rr-time-past', label: 'History', path: '/history' },
    { icon: 'fi-rr-bookmark', label: 'Saved Items', path: '/saved' },
    { divider: true },
    { label: 'Explore', header: true },
    { icon: 'fi-rr-flame', label: 'Trending', path: '/trending' },
    { icon: 'fi-rr-shopping-bag', label: 'Shopping', path: '/shopping' },
    { icon: 'fi-rr-music', label: 'Music', path: '/music' },
    { icon: 'fi-rr-gamepad', label: 'Gaming', path: '/gaming' },
  ];

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-[72px] hover:w-[240px] bg-white dark:bg-[#16171d] py-3 px-2 overflow-x-hidden overflow-y-auto z-[1000] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-2xl hover:shadow-black/5 group scrollbar-none">
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-none::-webkit-scrollbar { display: none; } .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }` }} />
      {menuItems.map((item, index) => {
        if (item.divider) return <hr key={index} className="border-none border-t border-slate-100 dark:border-slate-800 my-3 w-full" />;
        if (item.header) return (
          <h3 key={index} className="px-4 py-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {item.label}
          </h3>
        );
        
        const isActive = location.pathname === item.path;
        
        return (
          <div 
            key={index} 
            className={`flex items-center p-3.5 mb-1 rounded-xl cursor-pointer transition-all duration-200 min-w-[220px] ${isActive ? 'bg-accent/10 text-accent font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
            onClick={() => item.path && navigate(item.path)}
          >
            <span className="w-6 flex justify-center mr-5 shrink-0">
              <i className={`fi ${item.icon} flex items-center text-xl`}></i>
            </span>
            <span className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {item.label}
            </span>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
