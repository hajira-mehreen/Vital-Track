
import React, { useState } from 'react';
import { HealthMetric, CheckupRecord } from '../types';

interface CheckupsProps {
  metrics: HealthMetric[];
  records: CheckupRecord[];
  onAddMetric: (m: Partial<HealthMetric>) => void;
  onDeleteMetric: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

const Checkups: React.FC<CheckupsProps> = ({ metrics, records, onAddMetric, onDeleteMetric, setActiveTab }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    weight: '75',
    bpSys: '120',
    bpDia: '80',
    sugar: '90',
    sleep: '8',
    water: '1.5',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMetric({
      date: formData.date,
      weight: parseFloat(formData.weight),
      bloodPressureSys: parseInt(formData.bpSys),
      bloodPressureDia: parseInt(formData.bpDia),
      sugarLevel: parseFloat(formData.sugar),
      sleepHours: parseFloat(formData.sleep),
      waterIntake: parseFloat(formData.water),
      heartRate: 70
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 px-1 sm:px-0 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-800 pb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight mb-2">Vitals Log</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold">Daily measurements of your body's essential functions.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest interactive-element flex items-center justify-center gap-3 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          LOG NEW VITALS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Metric History List */}
        <div className="lg:col-span-7 rounded-[2.5rem] border border-slate-800 wellness-card overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Entry History</h4>
            <span className="px-3 py-1 bg-teal-900/40 text-teal-400 text-[10px] font-black rounded-lg border border-teal-800">{metrics.length} Total</span>
          </div>
          <div className="divide-y divide-slate-800 max-h-[600px] overflow-y-auto scrollbar-hide">
            {metrics.length === 0 ? (
                <div className="p-20 text-center text-slate-500 font-bold text-sm italic">No entries archived yet.</div>
            ) : metrics.slice().reverse().map((m) => (
              <div key={m.id} className="p-6 hover:bg-teal-900/10 transition-all flex items-center justify-between group border-slate-800">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 shrink-0 bg-slate-800 border border-slate-700 rounded-2xl flex flex-col items-center justify-center text-white font-black shadow-sm group-hover:border-teal-600 transition-colors">
                     <span className="text-[8px] font-black uppercase">{new Date(m.date).toLocaleString('default', { month: 'short' })}</span>
                     <span className="text-lg font-black">{new Date(m.date).getDate()}</span>
                   </div>
                   <div className="min-w-0">
                     <p className="text-sm font-black text-white">Physiology Snapshot</p>
                     <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Weight: <b className="text-slate-100">{m.weight}kg</b></span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">BP: <b className="text-slate-100">{m.bloodPressureSys}/{m.bloodPressureDia}</b></span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Sugar: <b className="text-slate-100">{m.sugarLevel}</b></span>
                     </div>
                   </div>
                </div>
                <button onClick={() => onDeleteMetric(m.id)} className="p-3 text-slate-500 hover:text-rose-500 interactive-element">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Records Section */}
        <div className="lg:col-span-5 space-y-6">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Clinical Context</h4>
           <div className="space-y-4">
              {records.length === 0 ? (
                   <div className="p-10 border border-dashed border-slate-700 rounded-[2rem] text-center text-slate-500 text-xs italic font-bold">Visit Clinical Records to add data.</div>
              ) : records.map(record => (
                <button key={record.id} onClick={() => setActiveTab('records')} className="w-full text-left p-6 md:p-8 rounded-[2rem] border border-slate-800 wellness-card group interactive-element">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-teal-900/30 text-teal-400 rounded-xl border border-teal-800 shadow-inner group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <h5 className="text-lg font-black text-white mb-1">{record.purpose}</h5>
                  <p className="text-xs text-slate-400 font-bold">{record.doctorName} • {record.facility}</p>
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Log Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <form onSubmit={handleSubmit} className="relative w-full max-w-xl p-8 sm:p-12 rounded-[3rem] border border-slate-700 wellness-card animate-in zoom-in-95 duration-300">
                <h3 className="text-2xl font-black text-white mb-8">Record New Vitals</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Weight (kg)</label>
                        <input type="number" step="0.1" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Sugar Level</label>
                        <input type="number" step="0.1" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold" value={formData.sugar} onChange={e => setFormData({...formData, sugar: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">BP Sys</label>
                        <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold" value={formData.bpSys} onChange={e => setFormData({...formData, bpSys: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">BP Dia</label>
                        <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold" value={formData.bpDia} onChange={e => setFormData({...formData, bpDia: e.target.value})} />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs interactive-element">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs interactive-element shadow-lg">Save Record</button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export default Checkups;
