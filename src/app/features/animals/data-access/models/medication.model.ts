
export interface Medication{
    id: number;
    medName: string;
    dose: string;
    route: string;
    givenAt: string;  // ISO datetime (e.g. new Date().toISOString())
    reason: string;
}

export type MedicationCreate = Omit<Medication, 'id'>;
export type MedicationUpdate = Omit<Medication, 'id'>;