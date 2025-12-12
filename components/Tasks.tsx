
import React, { useState } from 'react';
import { WellnessTask } from '../types';

interface TasksProps {
  tasks: WellnessTask[];
  onToggle: (id: string) => void;
  onAddTask: (task: Partial<WellnessTask>) => void;
  onDeleteTask: (id: string) => void;
}

const CategoryIcon = ({ cat }: { cat: string }) => {
  switch (cat) {
    case 'Medication': return <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.618.309a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.162 1.162a1 1 0 001.414 1.414l1.162-1.162a2 2 0 011.022-.547l2.387.477a6 6 0 003.86-.517l.618-.309a6 6 0 013.86-.517l2.387.477a2 2 0 011.022.547l1.162-1.162a1 1 0 00-1.414-1.414l-1.162 1.162z"></path></svg>;
    case 'Exercise': return <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
    case 'Hydration': return <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>;
    case 'Sleep': return <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
    default: return <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
  }
};

const Tasks: React.FC<TasksProps> = ({ tasks, onToggle, onAddTask, onDeleteTask }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', category: 'Medication', priority: 'Medium', time: '08:00 AM' });

  const categories = ['Medication', 'Exercise', 'Hydration', 'Sleep', 'Other'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    onAddTask({
      id: `task-${Date.now()}`,
      title: newTask.title,
      category: newTask.category as any,
      priority: newTask.priority as any,
      time: newTask.time,
      completed: false
    });
    setNewTask({ title: '', category: 'Medication', priority: 'Medium', time: '08:00 AM' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-5xl mx-auto pb-20 px-1 sm:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight mb-2">Daily Ledger</h2>
          <p className="text-sm sm:text-base text-slate-400 font-black">Keep your regimen disciplined and documented.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all duration-300 interactive-element ${
            showAdd 
              ? 'bg-slate-800 text-white border border-slate-700' 
              : 'bg-teal-600 text-white shadow-xl shadow-teal-900/40'
          }`}
        >
          {showAdd ? 'DISMISS' : 'ADD REMINDER'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="p-8 md:p-12 rounded-[3.5rem] border border-slate-800 wellness-card animate-in zoom-in-95 duration-500 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-teal-600"></div>
           <h3 className="text-xl md:text-2xl font-black text-white mb-8 tracking-tight">New Health Reminder</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
             <div className="lg:col-span-2">
               <label className="block text-[10px] font-black text-teal-400 uppercase tracking-widest mb-3 px-1">Task Title</label>
               <input 
                 autoFocus
                 required
                 className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm font-bold text-white focus:ring-4 focus:ring-teal-600/20 outline-none transition-all placeholder:text-slate-600" 
                 value={newTask.title} 
                 onChange={e => setNewTask({...newTask, title: e.target.value})} 
                 placeholder="e.g. Evening Vitamins"
               />
             </div>
             <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Category</label>
               <select 
                 className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm font-black appearance-none cursor-pointer text-white focus:ring-4 focus:ring-teal-600/20 outline-none" 
                 value={newTask.category} 
                 onChange={e => setNewTask({...newTask, category: e.target.value as any})}
               >
                 {categories.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
             </div>
             <div>
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Urgency</label>
               <select 
                 className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm font-black appearance-none cursor-pointer text-white focus:ring-4 focus:ring-teal-600/20 outline-none" 
                 value={newTask.priority} 
                 onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
               >
                 <option value="Low">Low</option>
                 <option value="Medium">Medium</option>
                 <option value="High">High</option>
               </select>
             </div>
             <button type="submit" className="w-full py-4 bg-teal-600 text-white font-black rounded-2xl interactive-element lg:col-span-4 uppercase tracking-widest text-[10px] shadow-lg">
               SAVE TO LEDGER
             </button>
           </div>
        </form>
      )}

      <div className="space-y-4">
        {tasks.filter(t => !t.completed).length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-500 font-black uppercase tracking-widest text-xs">Regimen complete for today.</div>
        ) : tasks.filter(t => !t.completed).map(task => (
          <div 
            key={task.id} 
            onClick={() => onToggle(task.id)}
            className="p-6 md:p-8 rounded-[2.5rem] border border-slate-800 wellness-card flex flex-col sm:flex-row items-center justify-between group gap-6 interactive-element"
          >
            <div className="flex items-center gap-6 flex-1 w-full">
              <div className="w-14 h-14 bg-slate-900 border-4 border-slate-800 rounded-full flex items-center justify-center transition-all group-hover:border-teal-600">
                <div className="w-4 h-4 rounded-full bg-slate-700 group-hover:bg-teal-400 transition-colors"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <CategoryIcon cat={task.category} />
                  <p className="font-black text-white text-lg tracking-tight group-hover:text-teal-400 transition-colors">{task.title}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.time}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                        task.priority === 'High' ? 'bg-rose-900/40 text-rose-400 border border-rose-800' :
                        task.priority === 'Medium' ? 'bg-orange-900/40 text-orange-400 border border-orange-800' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                        {task.priority}
                    </span>
                </div>
              </div>
            </div>
            {/* Fix: use onDeleteTask from props instead of non-existent deleteTask */}
            <button 
                onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                className="p-3 text-slate-600 hover:text-rose-500 interactive-element"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
