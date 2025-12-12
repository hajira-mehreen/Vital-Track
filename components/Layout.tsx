
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile;
}

const BRAND_ICON = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2228%22 fill=%22%230d9488%22/><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dominant-baseline=%22central%22 font-size=%2260%22 font-weight=%22900%22 fill=%22white%22 font-style=%22italic%22 font-family=%22Inter, sans-serif%22>V</text></svg>";

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'tasks': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
    case 'dashboard': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
    case 'body-stats': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
    case 'checkups': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>;
    case 'records': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>;
    case 'notes': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;
    case 'settings': return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
    default: return null;
  }
};

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, profile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'tasks', label: 'Reminders', iconName: 'tasks' },
    { id: 'dashboard', label: 'Overview', iconName: 'dashboard' },
    { id: 'body-stats', label: 'Body Stats', iconName: 'body-stats' },
    { id: 'checkups', label: 'Body Vitals', iconName: 'checkups' },
    { id: 'records', label: 'Clinical Visits', iconName: 'records' },
    { id: 'notes', label: 'Health Journal', iconName: 'notes' },
    { id: 'settings', label: 'Settings', iconName: 'settings' },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const initial = profile.name.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-100 selection:bg-teal-900 selection:text-teal-100 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <img src={BRAND_ICON} alt="VitalTrack Logo" className="w-8 h-8 rounded-xl" />
          <h1 className="text-lg font-bold tracking-tight">Vital Track</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center text-slate-100 font-black text-2xl interactive-element"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl transition-transform duration-300 lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-slate-800 hidden lg:flex items-center gap-4">
          <img src={BRAND_ICON} alt="Vital Track Logo" className="w-11 h-11 rounded-2xl shadow-xl transition-transform hover:rotate-3" />
          <div>
            <h1 className="text-xl font-black tracking-tighter">Vital Track</h1>
            <p className="text-[9px] uppercase font-black tracking-[0.25em] text-teal-400 leading-none mt-0.5">Health Ledger</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto mt-16 lg:mt-0 scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group interactive-element ${
                activeTab === item.id 
                  ? 'bg-teal-600 text-white shadow-xl shadow-teal-900/30 font-bold scale-[1.02]' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white font-semibold'
              }`}
            >
              <Icon name={item.iconName} />
              <span className="text-sm tracking-tight">{item.label}</span>
              {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={() => handleTabClick('settings')}
            className="w-full flex items-center gap-3 p-3 bg-slate-800/30 rounded-3xl hover:bg-slate-800 transition-all border border-slate-800 group interactive-element"
          >
            <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center text-white text-xl font-black italic shadow-md border-2 border-slate-700 flex-shrink-0">
              {initial}
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-xs font-black text-slate-100 truncate max-w-[120px]">{profile.name}</p>
              <p className="text-[9px] text-teal-400 font-black uppercase tracking-widest">Active Profile</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative px-6 py-20 lg:p-14 scroll-smooth bg-wellness-enhanced">
        <div className="max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
