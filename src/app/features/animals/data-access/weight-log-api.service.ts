import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/http/api-client.service';
import { WeightLog, WeightLogCreate, WeightLogUpdate } from './models/weight-log.model';


@Injectable({providedIn: 'root'})
export class WeightLogApiService {
    private api = inject(ApiClientService);

      /** GET /api/animals/{animalId}/weight-logs */
  list(animalId: number): Observable<WeightLog[]> {
    return this.api.get<WeightLog[]>(`/animals/${animalId}/weight-logs`);
  }

  /** POST /api/animals/{animalId}/weight-logs */
  create(animalId: number, body: WeightLogCreate): Observable<WeightLog> {
    return this.api.post<WeightLog>(`/animals/${animalId}/weight-logs`, body);
  }

  /** GET /api/weight-logs/{logId} */
  getOne(logId: number): Observable<WeightLog> {
    return this.api.get<WeightLog>(`/weight-logs/${logId}`);
  }

  /** PUT /api/weight-logs/{logId} */
  update(logId: number, body: WeightLogUpdate): Observable<WeightLog> {
    return this.api.put<WeightLog>(`/weight-logs/${logId}`, body);
  }

  /** DELETE /api/weight-logs/{logId} */
  delete(logId: number): Observable<void> {
    return this.api.delete<void>(`/weight-logs/${logId}`);
  }
}