import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/http/api-client.service';
import { Medication, MedicationCreate, MedicationUpdate } from './models/medication.model';

type Range = {from?: string | Date; to?: string | Date};

function toIso(v?: string | Date) {
    if (!v) return undefined;
    return v instanceof Date ? v.toISOString() : v;
}

@Injectable({providedIn: 'root'})
export class MedicationApiService {
  private api: ApiClientService = inject(ApiClientService);

    /** GET /api/animals/{animalId}/medications?from&to */
  listByAnimal(animalId: number, range?: Range): Observable<Medication[]> {
    return this.api.get<Medication[]>(
      `/animals/${animalId}/medications`,
      { from: toIso(range?.from), to: toIso(range?.to) }
    );
  }

    /** POST /api/animals/{animalId}/medications */
  createForAnimal(animalId: number, body: MedicationCreate): Observable<Medication> {
    return this.api.post<Medication>(`/animals/${animalId}/medications`, body);
  }

    /** GET /api/medications/{medId} */
  getOne(medId: number): Observable<Medication> {
    return this.api.get<Medication>(`/medications/${medId}`);
  }

  /** PUT /api/medications/{medId} */
  update(medId: number, body: MedicationUpdate): Observable<Medication> {
    return this.api.put<Medication>(`/medications/${medId}`, body);
  }

  /** DELETE /api/medications/{medId} */
  delete(medId: number): Observable<void> {
    return this.api.delete<void>(`/medications/${medId}`);
  }

}