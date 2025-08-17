import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../http/api-client.service';
import { HealthCheck, HealthCheckCreate  } from '../../models/health-check.model';


@Injectable({ providedIn: 'root' })
export class HealthApiService {
  private api = inject(ApiClientService);

  list(animalId: number): Observable<HealthCheck[]> {
    return this.api.get<HealthCheck[]>(`/animals/${animalId}/health-checks`);
  }

  create(animalId: number, body: HealthCheckCreate): Observable<HealthCheck> {
    return this.api.post<HealthCheck>(`/animals/${animalId}/health-checks`, body);
  }
}
