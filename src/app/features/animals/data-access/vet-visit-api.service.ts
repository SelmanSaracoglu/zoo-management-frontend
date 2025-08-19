import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/http/api-client.service';
import { VetVisit, VetVisitCreate, VetVisitUpdate } from './models/vet-visit.model';


@Injectable({providedIn: 'root'})
export class VetVisitApiService{
    private api = inject(ApiClientService);

      /** GET /api/animals/{animalId}/vet-visits */
  list(animalId: number): Observable<VetVisit[]> {
    return this.api.get<VetVisit[]>(`/animals/${animalId}/vet-visits`);
  }

  /** POST /api/animals/{animalId}/vet-visits */
  create(animalId: number, body: VetVisitCreate): Observable<VetVisit> {
    return this.api.post<VetVisit>(`/animals/${animalId}/vet-visits`, body);
  }

  /** GET /api/vet-visits/{visitId} */
  getOne(visitId: number): Observable<VetVisit> {
    return this.api.get<VetVisit>(`/vet-visits/${visitId}`);
  }

  /** PUT /api/vet-visits/{visitId} */
  update(visitId: number, body: VetVisitUpdate): Observable<VetVisit> {
    return this.api.put<VetVisit>(`/vet-visits/${visitId}`, body);
  }

  /** DELETE /api/vet-visits/{visitId} */
  delete(visitId: number): Observable<void> {
    return this.api.delete<void>(`/vet-visits/${visitId}`);
  }

}


