
export interface HealthCheck {
  id: number;
  animalId?: number;           // genelde response'ta opsiyonel
  checkTime: string;           // 'YYYY-MM-DDTHH:mm:ss'
  heartRateBpm?: number | null;
  temperatureC?: number | null; // BE BigDecimal -> FE number
  respirationRpm?: number | null;
  condition?: string | null;   // getter/setter 'condition' -> JSON 'condition'
  notes?: string | null;
}
export interface HealthCheckCreate {
  checkTime: string;           // 'YYYY-MM-DDTHH:mm:ss'
  heartRateBpm?: number | null;
  temperatureC?: number | null;
  respirationRpm?: number | null;
  condition?: string | null;
  notes?: string | null;
}