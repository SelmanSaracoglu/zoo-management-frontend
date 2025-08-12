export interface FeedingSchedule {
  id: number;
  animalId: number;
  timeOfDay: string; // ISO LocalTime, e.g. "08:30:00"
  food: string;
  portion: string;
  notes: string | null;
}

export interface FeedingScheduleCreate {
  timeOfDay: string; // "HH:mm:ss"
  food: string;
  portion: string;
  notes?: string | null;
}
