import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../http/api-client.service';
import { Staff, StaffCreate } from '../../models/staff.model';
import { Animal } from '../../features/animals/data-access/models/animal.model';

@Injectable({ providedIn: 'root' })
export class StaffApiService {
  private api = inject(ApiClientService);

  list(): Observable<Staff[]> {
    return this.api.get<Staff[]>('/staff');
  }

  create(data: StaffCreate): Observable<Staff> {
    return this.api.post<Staff>('/staff', data);
  }

  getAssignedAnimals(staffId: number): Observable<Animal[]> {
    return this.api.get<Animal[]>(`/staff/${staffId}/animals`);
  }

  assignAnimal(staffId: number, animalId: number): Observable<void> {
    return this.api.post<void>(`/staff/${staffId}/assign/${animalId}`, {});
  }

  unassignAnimal(staffId: number, animalId: number): Observable<void> {
    return this.api.delete<void>(`/staff/${staffId}/assign/${animalId}`);
  }
}
