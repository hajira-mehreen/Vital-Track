
import React, { useState } from 'react';
import { HealthNote, NoteTag } from '../types';

interface HealthNotesProps {
  notes: HealthNote[];
  onAddNote: (content: string, tags: NoteTag[]) => void;
  onDeleteNote: (id: string) => void;
}

const HealthNotes: React.FC<HealthNotesProps> = ({ notes, onAddNote, onDeleteNote }) => {
  const [newNote, setNewNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<NoteTag[]>([]);
  
  const allTags: NoteTag[] = ['Diet', 'Mood', 'Exercise', 'Sleep', 'General'];

  const handleAdd = () => {
    if (!newNote.trim()) return;
    onAddNote(newNote, selectedTags);
    setNewNote('');
    setSelectedTags([]);
  };

  const toggleTag = (tag: NoteTag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4 leading-none">Health Journal</h2>
        <p className="text-sm sm:text-base text-slate-400 font-bold">Document your physical states, dietary habits, and mental wellness.</p>
      </div>

      <div className="p-8 sm:p-12 rounded-[3.5rem] border border-slate-700 wellness-card space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-slate-800/20 pointer-events-none">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        </div>
        <textarea 
          placeholder="How are you feeling today? (e.g. Noticed more energy after high-protein breakfast)"
          className="w-full p-8 bg-slate-900 border border-slate-800 rounded-[2rem] h-48 focus:ring-4 focus:ring-teal-600/20 text-white resize-none font-bold transition-all shadow-inner placeholder:text-slate-600 outline-none border-slate-700"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Categorize Entry</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all interactive-element border ${
                  selectedTags.includes(tag) 
                    ? 'bg-teal-600 text-white shadow-lg border-teal-500' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleAdd}
          disabled={!newNote.trim()}
          className="w-full py-6 bg-teal-600 text-white font-black rounded-3xl hover:bg-teal-500 transition-all shadow-xl interactive-element disabled:opacity-50 disabled:grayscale uppercase tracking-widest text-xs"
        >
          POST TO JOURNAL
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Ledger History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {notes.length === 0 ? (
               <div className="md:col-span-2 py-20 text-center text-slate-600 font-black uppercase tracking-widest text-sm border-2 border-dashed border-slate-800 rounded-[3rem]">No journal entries documented yet.</div>
          ) : notes.slice().reverse().map(note => (
            <div key={note.id} className="p-8 rounded-[2.5rem] border border-slate-800 wellness-card group relative">
              <button 
                onClick={() => onDeleteNote(note.id)}
                className="absolute top-8 right-8 p-2 text-slate-700 hover:text-rose-500 transition-colors font-black interactive-element"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">{note.date}</span>
              </div>
              <p className="text-white leading-relaxed font-bold mb-8 text-sm">{note.content}</p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black text-teal-400 bg-teal-900/40 px-3 py-1.5 rounded-xl uppercase tracking-wider border border-teal-800 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthNotes;
