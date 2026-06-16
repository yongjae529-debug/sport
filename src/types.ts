export enum Screen {
  HOME = 'HOME',
  SLEEP = 'SLEEP',
  ACTIVITY = 'ACTIVITY',
  PROFILE = 'PROFILE',
  RECORDS_INSIGHTS = 'RECORDS_INSIGHTS',
  SLEEP_DETAILS = 'SLEEP_DETAILS',
}

export interface Workout {
  id: string;
  type: string;
  name: string;
  timeString: string;
  durationMinutes: number;
  caloriesBurned: number;
  intensity: '고강도' | '일정함' | '저강도';
  icon: string;
}

export interface DailyLog {
  id: string;
  title: string;
  category: 'exercise' | 'food' | 'water' | 'sleep' | 'body';
  timeString: string;
  valueString: string;
  subValueString?: string;
  statusString?: string;
  icon: string;
}

export interface UserInfo {
  name: string;
  age: number;
  level: string;
  avatarUrl: string;
  currentGoal: string;
  goalCompletionRate: number;
  monthlyWorkouts: number;
}
