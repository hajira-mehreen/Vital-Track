
import React, { useState } from 'react';
import { UserSettings, UserProfile } from '../types';

interface SettingsProps {
  settings: UserSettings;
  profile: UserProfile;
  onUpdateSettings: (s: Partial<UserSettings>) => void;
  onUpdateProfile: (p: Partial<UserProfile>) => void;
  onTestSound: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, profile, onUpdateSettings, onUpdateProfile, onTestSound }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({ 
    name: profile.name,
    age: profile.age,
    bloodType: profile.bloodType,
    gender: profile.gender
  });

  const handleSaveProfile = () => {
    onUpdateProfile(formData);
    setIsEditingProfile(false);
  };

  const initial = profile.name.charAt(0).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 px-1 sm:px-0 pb-20">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none mb-4">Configuration</h2>
        <p className="text-sm sm:text-base text-slate-400 font-bold">Personalize your ledger preferences and system identity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Profile Identity Card */}
        <div className="p-10 rounded-[3.5rem] border border-slate-700 wellness-card space-y-8 relative overflow-hidden group">
          <div className="flex justify-between items-center relative z-10">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
               <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               Profile Record
            </h3>
            <button 
              onClick={() => {
                if(isEditingProfile) handleSaveProfile();
                else setIsEditingProfile(true);
              }}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all interactive-element border ${
                isEditingProfile 
                  ? 'bg-teal-600 text-white border-teal-500 shadow-teal-900/40' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isEditingProfile ? 'SAVE' : 'EDIT'}
            </button>
          </div>

          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-[2rem] bg-teal-600 border-4 border-slate-800 shadow-2xl flex items-center justify-center text-white text-4xl font-black italic uppercase">
                 {initial}
              </div>
              <div className="flex-1">
                {isEditingProfile ? (
                  <div>
                    <label className="text-[8px] font-black uppercase text-teal-400 block mb-1">Full Identity Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 font-black text-white outline-none focus:ring-2 focus:ring-teal-500/50"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">{profile.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Master Identity</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 shadow-inner">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Blood Type</p>
                {isEditingProfile ? (
                  <select 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-black text-white"
                    value={formData.bloodType}
                    onChange={e => setFormData({...formData, bloodType: e.target.value})}
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                ) : (
                  <p className="text-2xl font-black text-rose-500">{profile.bloodType}</p>
                )}
              </div>
              <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 shadow-inner">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Age Reference</p>
                {isEditingProfile ? (
                  <input 
                    type="number" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 font-black text-white"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                  />
                ) : (
                  <p className="text-2xl font-black text-white">{profile.age} <span className="text-xs text-slate-500 font-black">YRS</span></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* System Settings Card */}
        <div className="p-10 rounded-[3.5rem] border border-slate-700 wellness-card space-y-12">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
             <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
             Environment
          </h3>
          <div className="space-y-10">
            <div className="flex items-center justify-between group">
              <div>
                <p className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">Tactile Alerts</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Audio feedback on completion.</p>
              </div>
              <button 
                onClick={() => onUpdateSettings({ reminderSound: !settings.reminderSound })}
                className={`w-16 h-8 rounded-full relative transition-all duration-300 interactive-element shadow-inner ${settings.reminderSound ? 'bg-teal-600' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${settings.reminderSound ? 'left-9' : 'left-1'}`}></div>
              </button>
            </div>
            
            <button 
              onClick={onTestSound}
              className="w-full py-5 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest interactive-element hover:bg-slate-800 flex items-center justify-center gap-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
              AUDIT NOTIFICATION
            </button>

            <div className="pt-8 border-t border-slate-800 space-y-6">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Metric Units</p>
               <div className="flex p-1.5 bg-slate-950 rounded-[1.5rem] border border-slate-800 shadow-inner">
                  <button onClick={() => onUpdateSettings({weightUnit: 'kg'})} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all interactive-element ${settings.weightUnit === 'kg' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-500'}`}>KG</button>
                  <button onClick={() => onUpdateSettings({weightUnit: 'lb'})} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all interactive-element ${settings.weightUnit === 'lb' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-500'}`}>LB</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
