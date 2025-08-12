

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../http/api-client.service';
import { Animal, AnimalCreate, AnimalUpdate } from '../../models/animal.model';

@Injectable({ providedIn: 'root' })
export class AnimalsApiService {
  private api = inject(ApiClientService);
  private readonly base = '/animals';

  /** GET /api/animals */
  list(): Observable<Animal[]> {
    return this.api.get<Animal[]>(this.base);
  }

  /** POST /api/animals */
  create(body: AnimalCreate): Observable<Animal> {
    return this.api.post<Animal>(this.base,body)
  }

 /** PUT /api/animals/{id} */
  update(id: number, body: AnimalUpdate): Observable<Animal> {
    return this.api.put<Animal>(`${this.base}/${id}`, body);
  }

    /** DELETE /api/animals/{id} */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.base}/${id}`);
  }
}

