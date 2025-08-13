import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../http/api-client.service';
import { HealthRecord, HealthRecordCreate } from '../../models/health.model';

@Injectable({ providedIn: 'root' })
export class HealthApiService {
  private api = inject(ApiClientService);

  list(animalId: number): Observable<HealthRecord[]> {
    return this.api.get<HealthRecord[]>(`/animals/${animalId}/health-records`);
  }

  create(animalId: number, body: HealthRecordCreate): Observable<HealthRecord> {
    return this.api.post<HealthRecord>(`/animals/${animalId}/health-records`, body);
  }
}
