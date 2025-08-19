export interface VetVisit {
    id: number;
    visitTime: string; // LocalDateTime → "yyyy-MM-dd'T'HH:mm:ss"
    purpose: string;
    diagnosis?: string;
    treatment?: string;
    followUpOn?: string;  // LocalDate → "yyyy-MM-dd"
}

export type VetVisitCreate = Omit<VetVisit, 'id'>;
export type VetVisitUpdate = Omit<VetVisit, 'id'>;