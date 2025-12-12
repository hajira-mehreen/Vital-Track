
import React, { useState } from 'react';
import { CheckupRecord } from '../types';

interface RecordsProps {
  records: CheckupRecord[];
  onAddRecord: (record: Partial<CheckupRecord>) => void;
  onDeleteRecord: (id: string) => void;
}

const Records: React.FC<RecordsProps> = ({ records, onAddRecord, onDeleteRecord }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    doctorName: '',
    facility: '',
    purpose: '',
    notes: '',
    bp: '120/80',
    pulse: '72',
    temp: '98.6'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord({
      date: formData.date,
      doctorName: formData.doctorName || 'Dr. Unknown',
      facility: formData.facility || 'General Clinic',
      purpose: formData.purpose || 'Routine Checkup',
      notes: formData.notes,
      vitals: {
        bp: formData.bp,
        pulse: parseInt(formData.pulse) || 0,
        temp: parseFloat(formData.temp) || 0
      }
    });
    setFormData({ ...formData, doctorName: '', facility: '', purpose: '', notes: '' });
    setShowAddModal(false);
  };

  const filteredRecords = records.filter(r => 
    r.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.facility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20 px-1 sm:px-0">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-slate-800 pb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight mb-2">Clinical Records</h2>
          <p className="text-sm sm:text-base text-slate-300 font-bold">Archive your medical visit notes and professional results.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full md:w-auto px-8 py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest interactive-element flex items-center justify-center gap-3 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          RECORD A VISIT
        </button>
      </div>

      <div className="relative group">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
        <input 
          type="text" 
          placeholder="Search archives by specialist or facility..."
          className="w-full pl-14 pr-6 py-5 bg-slate-900 border border-slate-800 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-teal-600/10 text-sm font-bold text-white placeholder:text-slate-600 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredRecords.length === 0 ? (
             <div className="py-20 text-center text-slate-500 font-black uppercase tracking-widest text-xs border-2 border-dashed border-slate-800 rounded-[3.5rem]">No clinical entries found.</div>
        ) : filteredRecords.map((record) => (
          <div key={record.id} className="p-8 md:p-12 rounded-[3.5rem] border border-slate-800 wellness-card group relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-teal-900/40 text-teal-400 rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-teal-800">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white tracking-tight leading-tight">{record.purpose}</h4>
                  <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest mt-1">{new Date(record.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                </div>
              </div>
              <button onClick={() => onDeleteRecord(record.id)} className="p-3 text-slate-500 hover:text-rose-500 interactive-element">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
              <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 shadow-inner">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Medical Specialist</p>
                <p className="text-lg font-black text-white leading-tight">{record.doctorName}</p>
                <p className="text-sm text-slate-400 font-bold mt-1">{record.facility}</p>
              </div>
              <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-slate-800 shadow-inner">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Vital Statistics</p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-black text-white border border-slate-700 shadow-sm">BP: {record.vitals.bp}</div>
                  <div className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-black text-white border border-slate-700 shadow-sm">PULSE: {record.vitals.pulse} bpm</div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 p-8 bg-slate-800/20 rounded-[2.5rem] border-l-8 border-teal-600">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Professional Notes</p>
                <p className="text-sm text-slate-200 leading-relaxed font-medium italic">"{record.notes || 'No notes available for this archive entry.'}"</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Visit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
            <form onSubmit={handleSubmit} className="relative w-full max-w-2xl p-8 md:p-12 rounded-[3.5rem] border border-slate-700 wellness-card animate-in slide-in-from-bottom-10 duration-300">
                <h3 className="text-3xl font-black text-white mb-10 tracking-tight">New Clinical Entry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Purpose of Visit</label>
                        <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-bold" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} placeholder="e.g. Regular Blood Pressure Monitoring" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Practitioner Name</label>
                        <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-bold" value={formData.doctorName} onChange={e => setFormData({...formData, doctorName: e.target.value})} placeholder="e.g. Dr. Jordan Smith" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Medical Facility</label>
                        <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-bold" value={formData.facility} onChange={e => setFormData({...formData, facility: e.target.value})} placeholder="e.g. Central Health Hub" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Observations & Notes</label>
                        <textarea className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white font-bold h-32 resize-none" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Record any important insights from the visit..." />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-5 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs interactive-element">Discard</button>
                    <button type="submit" className="flex-1 py-5 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs interactive-element shadow-lg">Commit Archive</button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export default Records;
