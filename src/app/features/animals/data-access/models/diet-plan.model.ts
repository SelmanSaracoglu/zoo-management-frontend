export interface DietPlan {
    id: number;
    caloriesKcal: number;
    notes?: string;
    startDate: string;   // LocalDate → "yyyy-MM-dd"
    endDate?: string;    // LocalDate → "yyyy-MM-dd"
}

export type DietPlanCreate = Omit<DietPlan, 'id'>;
export type DietPlanUpdate = Omit<DietPlan, 'id'>;