export enum RecordType {
  CHECKUP = 'CHECKUP',
  VACCINE = 'VACCINE',
  TREATMENT = 'TREATMENT',
}

export interface HealthRecord {
  id: number;
  animalId: number;
  recordDate: string; // ISO date "YYYY-MM-DD"
  type: RecordType;
  description: string;
  veterinarianName: string;
}

export interface HealthRecordCreate {
  recordDate: string; // "YYYY-MM-DD"
  type: RecordType;
  description: string;
  veterinarianName: string;
}
