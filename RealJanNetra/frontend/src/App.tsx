import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAppStore } from './store/appStore';

// Lazy loading pages for performance
const HomeFeed = lazy(() => import('./pages/HomeFeed'));
const Profile = lazy(() => import('./pages/Profile'));
const Signup = lazy(() => import('./features/auth/components/Signup'));

// Professional Loading Placeholder
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-[#08060d] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
        <Navbar />
        
        <div className="flex pt-14">
          <Sidebar />
          
          <main className="ml-[72px] flex-1 p-4 lg:p-8 transition-all duration-300">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* if authenticated, show feed, else redirect to signup */}
                <Route path="/" element={isAuthenticated ? <HomeFeed /> : <Navigate to="/signup" />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signup" />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
            
            <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-xs font-black uppercase tracking-widest pb-10">
              © 2026 JanNetra • India's Administrative Network
            </footer>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
