
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Checkups from './components/Checkups';
import Tasks from './components/Tasks';
import HealthNotes from './components/HealthNotes';
import Progress from './components/Progress';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Records from './components/Records';
import BodyStats from './components/BodyStats';
import { HealthMetric, CheckupRecord, WellnessTask, HealthState, UserProfile, HealthNote, NoteTag, UserSettings } from './types';

const INITIAL_PROFILE: UserProfile = {
  id: 'VT-9901',
  name: 'Alex Thompson',
  age: 32,
  gender: 'Male',
  bloodType: 'O+',
  height: 182,
  weight: 78.5,
  allergies: ['Penicillin', 'Peanuts'],
  conditions: ['Mild Asthma'],
};

const DEFAULT_TASKS: WellnessTask[] = [
  { id: '1', title: 'Morning Multivitamin', time: '08:00 AM', completed: false, category: 'Medication', priority: 'High' },
  { id: '2', title: 'Hydration Goal (2L)', time: 'Throughout Day', completed: false, category: 'Hydration', priority: 'Medium' },
  { id: '3', title: 'Afternoon Probiotic', time: '02:00 PM', completed: false, category: 'Medication', priority: 'Medium' },
];

const DEFAULT_STATE: HealthState = {
  profile: INITIAL_PROFILE,
  metrics: [],
  records: [],
  tasks: DEFAULT_TASKS,
  notes: [],
  streak: 0,
  lastLoginDate: new Date().toISOString().split('T')[0],
  settings: {
    weightUnit: 'kg',
    sugarUnit: 'mg/dL',
    reminderSound: true,
    reminderTime: '08:00',
    theme: 'light'
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [healthState, setHealthState] = useState<HealthState>(() => {
    const saved = localStorage.getItem('vital_track_state_vfinal_theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      const today = new Date().toISOString().split('T')[0];
      const last = parsed.lastLoginDate;
      
      if (last === today) {
        return parsed;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yestStr = yesterday.toISOString().split('T')[0];
        const newStreak = last === yestStr ? parsed.streak + 1 : (last === today ? parsed.streak : 1);
        const resetTasks = parsed.tasks.map((t: WellnessTask) => ({ ...t, completed: false }));
        
        return {
          ...parsed,
          streak: newStreak,
          lastLoginDate: today,
          tasks: resetTasks
        };
      }
    }
    return { ...DEFAULT_STATE, streak: 1 };
  });

  // Handle Theme Switching
  useEffect(() => {
    if (healthState.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [healthState.settings.theme]);

  useEffect(() => {
    localStorage.setItem('vital_track_state_vfinal_theme', JSON.stringify(healthState));
  }, [healthState]);

  const playNotificationSound = useCallback(() => {
    if (!healthState.settings.reminderSound) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) { console.warn(e); }
  }, [healthState.settings.reminderSound]);

  const toggleTask = (id: string) => {
    setHealthState(prev => {
      const isCompleting = !prev.tasks.find(t => t.id === id)?.completed;
      if (isCompleting) playNotificationSound();
      
      return {
        ...prev,
        tasks: prev.tasks.map(t => 
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      };
    });
  };

  const addTask = (task: Partial<WellnessTask>) => {
    setHealthState(prev => ({ ...prev, tasks: [...prev.tasks, task as WellnessTask] }));
  };

  const deleteTask = (id: string) => {
    setHealthState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  const addMetric = (m: Partial<HealthMetric>) => {
    const newMetric: HealthMetric = {
      id: `m-${Date.now()}`,
      date: m.date || new Date().toISOString().split('T')[0],
      weight: m.weight || 0,
      bloodPressureSys: m.bloodPressureSys || 0,
      bloodPressureDia: m.bloodPressureDia || 0,
      heartRate: m.heartRate || 0,
      sleepHours: m.sleepHours || 0,
      sugarLevel: m.sugarLevel || 0,
      waterIntake: m.waterIntake || 0
    };
    setHealthState(prev => ({ ...prev, metrics: [...prev.metrics, newMetric] }));
  };

  const addRecord = (r: Partial<CheckupRecord>) => {
    const newRecord: CheckupRecord = {
      id: `rec-${Date.now()}`,
      date: r.date || '',
      doctorName: r.doctorName || 'General Practice',
      facility: r.facility || 'Health Center',
      purpose: r.purpose || 'Checkup',
      notes: r.notes || '',
      vitals: r.vitals || { bp: '--', pulse: 0, temp: 0 }
    };
    setHealthState(prev => ({ ...prev, records: [newRecord, ...prev.records] }));
  };

  const deleteRecord = (id: string) => {
    setHealthState(prev => ({ ...prev, records: prev.records.filter(r => r.id !== id) }));
  };

  const updateProfile = (p: Partial<UserProfile>) => {
    setHealthState(prev => ({ ...prev, profile: { ...prev.profile, ...p } }));
  };

  const updateSettings = (s: Partial<UserSettings>) => {
    setHealthState(prev => ({ ...prev, settings: { ...prev.settings, ...s } }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard metrics={healthState.metrics} records={healthState.records} tasks={healthState.tasks} streak={healthState.streak} setActiveTab={setActiveTab} />;
      case 'body-stats':
        return <BodyStats profile={healthState.profile} metrics={healthState.metrics} onUpdateProfile={updateProfile} onAddMetric={addMetric} />;
      case 'checkups':
        return <Checkups metrics={healthState.metrics} records={healthState.records} onAddMetric={addMetric} onDeleteMetric={(id) => setHealthState(prev => ({...prev, metrics: prev.metrics.filter(m => m.id !== id)}))} setActiveTab={setActiveTab} />;
      case 'records':
        return <Records records={healthState.records} onAddRecord={addRecord} onDeleteRecord={deleteRecord} />;
      case 'notes':
        return <HealthNotes notes={healthState.notes} onAddNote={(content, tags) => {
          const newNote: HealthNote = {
            id: `n-${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            content,
            tags
          };
          setHealthState(prev => ({ ...prev, notes: [...prev.notes, newNote] }));
        }} onDeleteNote={(id) => setHealthState(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== id) }))} />;
      case 'tasks':
        return <Tasks tasks={healthState.tasks} onToggle={toggleTask} onAddTask={addTask} onDeleteTask={deleteTask} />;
      case 'settings':
        return <Settings settings={healthState.settings} profile={healthState.profile} onUpdateSettings={updateSettings} onUpdateProfile={updateProfile} onTestSound={playNotificationSound} />;
      case 'profile':
        return <Profile profile={healthState.profile} />;
      default:
        return <Tasks tasks={healthState.tasks} onToggle={toggleTask} onAddTask={addTask} onDeleteTask={deleteTask} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} profile={healthState.profile}>
      {renderContent()}
    </Layout>
  );
};

export default App;
