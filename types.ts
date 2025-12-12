
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  height: number;
  weight: number;
  allergies: string[];
  conditions: string[];
}

export interface HealthMetric {
  id: string;
  date: string;
  weight: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  heartRate: number;
  sleepHours: number;
  sugarLevel: number;
  waterIntake: number;
}

export interface CheckupRecord {
  id: string;
  date: string;
  doctorName: string;
  facility: string;
  purpose: string;
  notes: string;
  vitals: {
    bp: string;
    pulse: number;
    temp: number;
  };
}

export type NoteTag = 'Diet' | 'Mood' | 'Exercise' | 'Sleep' | 'General' | 'Medicine';

export interface HealthNote {
  id: string;
  date: string;
  content: string;
  tags: NoteTag[];
}

export interface WellnessTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  category: 'Medication' | 'Exercise' | 'Hydration' | 'Sleep' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
}

export interface UserSettings {
  weightUnit: 'kg' | 'lb';
  sugarUnit: 'mg/dL' | 'mmol/L';
  reminderSound: boolean;
  reminderTime: string;
  theme: 'light' | 'dark';
}

export interface HealthState {
  profile: UserProfile;
  metrics: HealthMetric[];
  records: CheckupRecord[];
  tasks: WellnessTask[];
  notes: HealthNote[];
  streak: number;
  lastLoginDate: string;
  settings: UserSettings;
}
