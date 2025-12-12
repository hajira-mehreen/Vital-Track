
import React, { useState } from 'react';

const DoctorPortal: React.FC = () => {
  const [patients] = useState([
    { id: '101', name: 'Alex Thompson', lastVisit: '2024-05-20', condition: 'Hypertension', status: 'Stable' },
    { id: '102', name: 'Sarah Miller', lastVisit: '2024-05-18', condition: 'Type 2 Diabetes', status: 'Needs Follow-up' },
    { id: '103', name: 'David Chen', lastVisit: '2024-05-15', condition: 'Routine Checkup', status: 'Healthy' },
    { id: '104', name: 'Emma Wilson', lastVisit: '2024-05-10', condition: 'Asthma', status: 'Reviewing Meds' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Your Patients</h3>
          <p className="text-slate-500">Manage records and consults for 24 active patients.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-100 rounded-xl p-2 px-4 flex flex-col items-center">
             <span className="text-xl font-bold text-blue-600">8</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase">Appointments</span>
           </div>
           <div className="bg-slate-100 rounded-xl p-2 px-4 flex flex-col items-center">
             <span className="text-xl font-bold text-rose-600">3</span>
             <span className="text-[10px] text-slate-500 font-bold uppercase">Urgent</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${p.id}/100/100`} alt={p.name} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                  <p className="text-xs text-slate-500">ID: {p.id}</p>
                </div>
              </div>
              <span className={`h-fit px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
                p.status === 'Needs Follow-up' ? 'bg-amber-100 text-amber-600' :
                p.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {p.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-4">
              <div>
                <p className="text-slate-400 text-xs">Primary Concern</p>
                <p className="font-semibold text-slate-700">{p.condition}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Last Visit</p>
                <p className="font-semibold text-slate-700">{p.lastVisit}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100">Add Record</button>
              <button className="flex-1 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100">History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPortal;
