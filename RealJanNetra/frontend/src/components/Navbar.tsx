import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import Tooltip from '../shared/components/Tooltip';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-[#16171d] flex items-center justify-between px-4 z-[1100] border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <Tooltip text="Menu" position="bottom">
          <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
            <i className="fi fi-rr-menu-burger flex items-center text-xl"></i>
          </button>
        </Tooltip>
        <div 
          className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white cursor-pointer select-none" 
          onClick={() => navigate('/')}
        >
          <span className="text-2xl text-accent">👁️</span>
          <span className="tracking-tight">Jan<span className="text-accent">Netra</span></span>
        </div>
      </div>
      
      {isAuthenticated ? (
        <>
          <div className="hidden md:flex items-center gap-3 flex-[0_1_728px]">
            <div className="flex flex-1 border border-slate-200 dark:border-slate-700 rounded-full overflow-hidden bg-slate-50 dark:bg-slate-900 focus-within:border-accent transition-colors">
              <input 
                type="text" 
                placeholder="Search for states, districts, or leaders..." 
                className="flex-1 border-none px-5 py-2 text-sm bg-transparent text-slate-900 dark:text-white outline-none" 
              />
              <Tooltip text="Search" position="bottom">
                <button className="bg-slate-100 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 px-6 flex items-center hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                  <i className="fi fi-rr-search flex items-center"></i>
                </button>
              </Tooltip>
            </div>
            <Tooltip text="Voice Search" position="bottom">
              <button className="bg-slate-100 dark:bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                <i className="fi fi-rr-microphone flex items-center"></i>
              </button>
            </Tooltip>
          </div>

          <div className="flex items-center gap-3">
            <Tooltip text="Create Post" position="bottom">
              <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <i className="fi fi-rr-plus flex items-center text-lg"></i>
              </button>
            </Tooltip>
            <Tooltip text="Notifications" position="bottom">
              <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <i className="fi fi-rr-bell flex items-center text-lg"></i>
              </button>
            </Tooltip>
            <Tooltip text="User Account" position="bottom">
              <div 
                className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center font-bold ml-2 cursor-pointer shadow-sm hover:opacity-90 transition-opacity" 
                onClick={() => navigate('/profile')}
              >
                V
              </div>
            </Tooltip>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/signup')} className="text-slate-500 font-bold text-sm hover:text-white transition-colors">Login</button>
          <button onClick={() => navigate('/signup')} className="bg-accent text-white px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-105 transition-all">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
