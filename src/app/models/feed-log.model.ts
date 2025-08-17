export interface FeedLog {
  id: number;
  animalId?: number;
  feedTime: string;                 // 'YYYY-MM-DDTHH:mm:ss'
  foodItem: string;
  quantityGrams?: number | null;
  waterMilliliters?: number | null; // <-- BU ALAN VAR
  notes?: string | null;
}

export interface FeedingLogCreate {
  feedTime: string;
  foodItem: string;
  quantityGrams?: number | null;
  waterMilliliters?: number | null;
  notes?: string | null;
}
