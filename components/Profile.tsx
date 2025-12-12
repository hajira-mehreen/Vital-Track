
import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const initial = profile.name.charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 px-1 sm:px-0 pb-20">
      <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-14 border border-slate-800 wellness-card flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-40 h-40 rounded-[2.5rem] bg-teal-600 flex items-center justify-center text-white text-7xl font-black border-4 border-slate-800 shadow-2xl uppercase italic">
            {initial}
          </div>
          <button className="absolute -bottom-3 -right-3 bg-teal-500 text-white p-4 rounded-2xl border-4 border-slate-800 shadow-2xl hover:scale-110 interactive-element">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{profile.name}</h3>
            <span className="px-4 py-1.5 bg-teal-900/40 text-teal-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-teal-800 shadow-sm self-center md:self-auto">ID: {profile.id}</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-950/60 rounded-[2.5rem] border border-slate-800 shadow-inner">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Age Reference</p>
               <p className="text-3xl font-black text-white">{profile.age} <span className="text-xs text-slate-500 font-black">YRS</span></p>
            </div>
            <div className="p-6 bg-slate-950/60 rounded-[2.5rem] border border-slate-800 shadow-inner">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Classification</p>
               <p className="text-3xl font-black text-rose-500">{profile.bloodType}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 wellness-card group">
          <h4 className="text-xl font-black text-white mb-8 flex items-center gap-4">
            <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Documented Allergies
          </h4>
          <div className="flex flex-wrap gap-3">
            {profile.allergies.map(all => (
              <span key={all} className="px-5 py-2.5 bg-rose-900/30 text-rose-400 text-[10px] font-black rounded-xl border border-rose-800 uppercase tracking-wider shadow-sm transition-colors hover:bg-rose-900/50">{all}</span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 wellness-card group">
          <h4 className="text-xl font-black text-white mb-8 flex items-center gap-4">
            <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.618.309a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.162 1.162a1 1 0 001.414 1.414l1.162-1.162a2 2 0 011.022-.547l2.387.477a6 6 0 003.86-.517l.618-.309a6 6 0 013.86-.517l2.387.477a2 2 0 011.022.547l1.162-1.162a1 1 0 00-1.414-1.414l-1.162 1.162z"></path></svg>
            Pathology Archives
          </h4>
          <div className="flex flex-wrap gap-3">
            {profile.conditions.map(cond => (
              <span key={cond} className="px-5 py-2.5 bg-teal-900/30 text-teal-400 text-[10px] font-black rounded-xl border border-teal-800 uppercase tracking-wider shadow-sm transition-colors hover:bg-teal-900/50">{cond}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
