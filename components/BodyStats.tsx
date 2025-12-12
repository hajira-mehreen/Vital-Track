
import React, { useState } from 'react';
import { UserProfile, HealthMetric } from '../types';

interface BodyStatsProps {
  profile: UserProfile;
  metrics: HealthMetric[];
  onUpdateProfile: (p: Partial<UserProfile>) => void;
  onAddMetric: (m: Partial<HealthMetric>) => void;
}

const BodyStats: React.FC<BodyStatsProps> = ({ profile, metrics, onUpdateProfile, onAddMetric }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ height: profile.height, weight: profile.weight });
  const [newWeight, setNewWeight] = useState('');

  const handleUpdateProfile = () => {
    onUpdateProfile({ height: profileForm.height, weight: profileForm.weight });
    setIsEditingProfile(false);
  };

  const handleAddWeightLog = () => {
    if (!newWeight) return;
    onAddMetric({
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
      waterIntake: metrics[metrics.length - 1]?.waterIntake || 0,
      sleepHours: metrics[metrics.length - 1]?.sleepHours || 0,
      bloodPressureSys: metrics[metrics.length - 1]?.bloodPressureSys || 120,
      bloodPressureDia: metrics[metrics.length - 1]?.bloodPressureDia || 80,
    });
    setNewWeight('');
  };

  const latestWeight = metrics.length > 0 ? metrics[metrics.length - 1].weight : profile.weight;

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20 animate-in fade-in duration-700 px-1 sm:px-0">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight mb-2">Physiology</h2>
        <p className="text-sm sm:text-base text-slate-400 font-bold">Archive body composition and historical scale recordings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <div className="p-8 md:p-10 rounded-[3.5rem] border border-slate-700 wellness-card space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 text-slate-800/20 pointer-events-none group-hover:scale-110 transition-transform hidden sm:block">
            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4">
             <h3 className="text-xl font-black text-white flex items-center gap-3">
               <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
               Static Metrics
             </h3>
             <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all interactive-element border ${
                  isEditingProfile 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-teal-900/30 text-teal-400 border-teal-800 hover:bg-teal-900/50'
                }`}
             >
                {isEditingProfile ? 'CANCEL' : 'EDIT PROFILE'}
             </button>
          </div>

          <div className="space-y-6 relative z-10">
            {isEditingProfile ? (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-teal-400 block mb-2 px-1">Height (cm)</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 font-bold text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                    value={profileForm.height}
                    onChange={e => setProfileForm({...profileForm, height: parseFloat(e.target.value)})}
                  />
                </div>
                <button 
                  onClick={handleUpdateProfile}
                  className="w-full py-4 bg-teal-600 text-white font-black rounded-2xl interactive-element shadow-lg uppercase tracking-widest text-xs"
                >
                  SAVE CHANGES
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 bg-slate-800/40 rounded-[2.5rem] border border-slate-700 hover:border-teal-500 transition-all shadow-inner">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Current Stature</p>
                   <p className="text-2xl md:text-4xl font-black text-white tracking-tight">{profile.height} <span className="text-sm font-bold text-slate-500">CM</span></p>
                </div>

                <div className="p-6 bg-slate-800/40 rounded-[2.5rem] border border-slate-700 hover:border-teal-500 transition-all shadow-inner">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Reference Weight</p>
                   <p className="text-2xl md:text-4xl font-black text-white tracking-tight">{profile.weight} <span className="text-sm font-bold text-slate-500">KG</span></p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-slate-800 p-8 md:p-10 rounded-[3.5rem] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden group border border-slate-700">
           <div className="absolute top-0 right-0 p-10 text-slate-700/20 pointer-events-none group-hover:scale-110 transition-transform">
              <svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
           </div>
           
           <h3 className="text-xl font-black flex items-center gap-3 relative z-10">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Live Calibration
           </h3>
           
           <div className="text-center py-10 bg-slate-900/60 rounded-[3rem] border border-white/5 backdrop-blur-sm relative z-10 my-8 shadow-inner">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Current Mass Assessment</p>
              <h4 className="text-5xl md:text-7xl font-black text-white tracking-tighter">{latestWeight} <span className="text-lg md:text-2xl font-bold opacity-30 italic">KG</span></h4>
           </div>

           <div className="space-y-4 relative z-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="number" 
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl p-5 font-black text-white focus:outline-none focus:ring-4 focus:ring-teal-600/30 transition-all text-sm placeholder:text-slate-700"
                  placeholder="Enter scale value..."
                  value={newWeight}
                  onChange={e => setNewWeight(e.target.value)}
                />
                <button 
                  onClick={handleAddWeightLog}
                  className="w-full sm:w-auto px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl shadow-xl interactive-element uppercase tracking-widest text-[10px]"
                >
                  COMMIT
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BodyStats;
