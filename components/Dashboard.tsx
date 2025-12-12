
import React from 'react';
import { HealthMetric, CheckupRecord, WellnessTask } from '../types';

interface DashboardProps {
  metrics: HealthMetric[];
  records: CheckupRecord[];
  tasks: WellnessTask[];
  streak: number;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics, records, tasks, streak, setActiveTab }) => {
  const latest = metrics[metrics.length - 1];
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-5xl mx-auto px-1 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-teal-400 font-black uppercase tracking-[0.2em] text-[10px] bg-teal-900/30 px-3 py-1.5 rounded-full mb-4 border border-teal-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            System Status: Healthy
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight mb-2">My Daily Ledger</h2>
          <p className="text-sm sm:text-base text-slate-400 font-bold">Archiving your wellness journey one note at a time.</p>
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="text-left md:text-right w-full">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Consistency Streak</p>
             <div className="flex items-center gap-2 md:justify-end">
                <svg className="w-8 h-8 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1014 0c0-1.187-.233-2.32-.659-3.354a5.261 5.261 0 00-1.817-2.383 5.342 5.342 0 00-2.13-1.012l.001-.001z" clipRule="evenodd"></path></svg>
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">{streak} {streak === 1 ? 'Day' : 'Days'}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Wellness Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Weight Stat */}
        <button 
          onClick={() => setActiveTab('body-stats')}
          className="text-left p-6 md:p-8 rounded-[2.5rem] border border-slate-800 wellness-card relative overflow-hidden group interactive-element"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-teal-900/40 text-teal-400 rounded-2xl flex items-center justify-center shadow-inner border border-teal-800 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Analytics</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Body Mass</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{latest?.weight || '--'}</h3>
            <span className="text-base md:text-xl font-bold text-slate-500">kg</span>
          </div>
        </button>

        {/* Hydration Stat */}
        <button 
          onClick={() => setActiveTab('checkups')}
          className="text-left p-6 md:p-8 rounded-[2.5rem] border border-slate-800 wellness-card relative overflow-hidden group interactive-element"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-900/40 text-blue-400 rounded-2xl flex items-center justify-center shadow-inner border border-blue-800 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Hydration</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Daily Intake</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{latest?.waterIntake || '0'}</h3>
            <span className="text-base md:text-xl font-bold text-slate-500">/ 2.5 L</span>
          </div>
          <div className="mt-8 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(((latest?.waterIntake || 0) / 2.5) * 100, 100)}%` }}></div>
          </div>
        </button>

        {/* Active Regimen */}
        <button 
          onClick={() => setActiveTab('tasks')}
          className="text-left bg-slate-800 p-6 md:p-8 rounded-[2.5rem] text-white border border-slate-700 relative overflow-hidden group interactive-element"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-teal-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Regimen</p>
              <p className="text-xs font-bold text-teal-400">{completedTasks}/{tasks.length} Done</p>
            </div>
          </div>
          <div className="space-y-3">
             {tasks.filter(t => !t.completed).slice(0, 1).map(task => (
               <div key={task.id} className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Up Next</p>
                 <p className="font-bold text-sm text-white truncate">{task.title}</p>
                 <p className="text-[9px] text-teal-400 font-black mt-2 uppercase">{task.time}</p>
               </div>
             ))}
          </div>
        </button>
      </div>

      {/* Medical Record Preview */}
      <button 
        onClick={() => setActiveTab('records')}
        className="w-full text-left p-8 md:p-12 rounded-[3.5rem] border border-slate-800 wellness-card border-b-8 border-teal-600 group interactive-element"
      >
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black text-white tracking-tight">Clinical Archives</h3>
          <div className="p-3 bg-teal-900/30 text-teal-400 rounded-xl border border-teal-800">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
        </div>
        
        {records.length > 0 ? (
          <div className="space-y-6">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center text-teal-400 text-3xl font-black italic">
                {records[0].doctorName.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-black text-white">{records[0].purpose}</h4>
                <p className="text-sm text-slate-400 font-bold">{records[0].doctorName} • {records[0].facility}</p>
              </div>
            </div>
            <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800 text-slate-300 text-sm leading-relaxed italic border-l-8 border-teal-600">
              "{records[0].notes.substring(0, 150)}..."
            </div>
          </div>
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-slate-700 rounded-3xl text-slate-500 font-black uppercase tracking-widest text-xs">No records logged yet.</div>
        )}
      </button>
    </div>
  );
};

export default Dashboard;
