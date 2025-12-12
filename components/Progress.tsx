
import React from 'react';
import { HealthMetric, WellnessTask } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ProgressProps {
  metrics: HealthMetric[];
  tasks: WellnessTask[];
}

const Progress: React.FC<ProgressProps> = ({ metrics, tasks }) => {
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;
  const taskProgress = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <div className="space-y-12 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Performance Tracking</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Visualize your growth and consistency.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Weekly Completion Card */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
          <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Habit Consistency</h4>
          
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
                   strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * taskProgress) / 100}
                   className="text-indigo-600 dark:text-indigo-500 transition-all duration-1000" strokeLinecap="round" />
               </svg>
               <div className="absolute flex flex-col items-center">
                 <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{Math.round(taskProgress)}%</span>
                 <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase">Today</span>
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <div>
                 <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{completedTasksCount} / {totalTasksCount}</p>
                 <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Daily Goals Accomplished</p>
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                 "Consistent habits lead to remarkable results. You're doing better than 70% of peers!"
               </p>
            </div>
          </div>
        </div>

        {/* Vital Distribution */}
        <div className="bg-slate-900 dark:bg-slate-800 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden transition-colors">
           <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 pointer-events-none">📊</div>
           <h4 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">Sugar Levels (mg/dL)</h4>
           <div className="h-[180px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={metrics.slice(-7)}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                 <XAxis dataKey="date" hide />
                 <Tooltip 
                   cursor={{fill: '#ffffff05'}}
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                 />
                 <Bar dataKey="sugarLevel" fill="#4f46e5" radius={[6, 6, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
           <div className="mt-6 flex justify-between items-center pt-6 border-t border-white/10">
              <span className="text-xs font-bold text-slate-400 uppercase">7 Day Stability</span>
              <span className="text-xs font-black text-emerald-400 uppercase">Excellent</span>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative transition-colors">
         <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10">Physical State Timeline</h4>
         <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'var(--tw-bg-opacity, #fff)'
                  }}
                />
                <Area type="monotone" dataKey="sleepHours" stroke="#818cf8" fill="#818cf820" strokeWidth={3} />
                <Area type="monotone" dataKey="waterIntake" stroke="#38bdf8" fill="#38bdf820" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};

export default Progress;
