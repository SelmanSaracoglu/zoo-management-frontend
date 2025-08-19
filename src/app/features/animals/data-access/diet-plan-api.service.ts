import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/http/api-client.service';
import { DietPlan, DietPlanCreate, DietPlanUpdate } from './models/diet-plan.model';

@Injectable({providedIn: 'root'})
export class DietPlanApiService {
    private api = inject(ApiClientService);

    /** GET /api/animals/{animalId}/diet-plans */
  listByAnimal(animalId: number): Observable<DietPlan[]> {
    return this.api.get<DietPlan[]>(`/animals/${animalId}/diet-plans`);
  }

  /** POST /api/animals/{animalId}/diet-plans */
  createForAnimal(animalId: number, body: DietPlanCreate): Observable<DietPlan> {
    return this.api.post<DietPlan>(`/animals/${animalId}/diet-plans`, body);
  }

  /** GET /api/diet-plans/{planId} */
  getOne(planId: number): Observable<DietPlan> {
    return this.api.get<DietPlan>(`/diet-plans/${planId}`);
  }

  /** PUT /api/diet-plans/{planId} */
  update(planId: number, body: DietPlanUpdate): Observable<DietPlan> {
    return this.api.put<DietPlan>(`/diet-plans/${planId}`, body);
  }

  /** DELETE /api/diet-plans/{planId} */
  delete(planId: number): Observable<void> {
    return this.api.delete<void>(`/diet-plans/${planId}`);
  }
}
