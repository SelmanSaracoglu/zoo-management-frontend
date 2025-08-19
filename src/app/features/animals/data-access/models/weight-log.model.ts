export interface WeightLog {
    id: number;
    weightKg: number;
    loggedAt: string;
    note?: string;

}

export type WeightLogCreate = Omit<WeightLog, 'id'>;
export type WeightLogUpdate = Omit<WeightLog, 'id'>;

