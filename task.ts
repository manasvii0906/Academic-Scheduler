export type TaskType = 'academic' | 'extracurricular';
export type Priority = 1 | 2 | 3 | 4 | 5;
export type TimePreference = 'morning' | 'afternoon' | 'evening' | 'night';

export interface BaseTask {
  id: string;
  name: string;
  type: TaskType;
  hoursRequired: number;
  priority: Priority;
  deadline: Date;
  completed: boolean;
  scheduledDate?: Date;
  scheduledTime?: string;
}

export interface AcademicTask extends BaseTask {
  type: 'academic';
  subject: string;
  credits: number;
}

export interface ExtracurricularTask extends BaseTask {
  type: 'extracurricular';
  activity: string;
}

export type Task = AcademicTask | ExtracurricularTask;

export interface StudentPreferences {
  maxStudyHoursPerDay: number;
  preferredStudyTime: TimePreference;
  freeTimeSlots: TimeSlot[];
  targetExtracurricularHours: number;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface ScheduleEntry {
  task: Task;
  day: string;
  startTime: string;
  endTime: string;
}

export interface ProgressStats {
  totalAcademicHours: number;
  totalExtracurricularHours: number;
  completedAcademicHours: number;
  completedExtracurricularHours: number;
  upcomingDeadlines: Task[];
  balanceRatio: number;
}

export interface Suggestion {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  action?: string;
}