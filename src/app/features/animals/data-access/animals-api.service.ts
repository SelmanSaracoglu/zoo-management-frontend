

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/http/api-client.service';
import { Animal, AnimalCreate, AnimalUpdate } from './models/animal.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnimalsApiService {
  private api: ApiClientService = inject(ApiClientService);
  private readonly base = '/api/animals';

  /** GET /api/animals */
  list(): Observable<Animal[]> {
    return this.api.get<Animal[]>(this.base);
  }

  getById(id:number): Observable<Animal> {
    return this.api.get<Animal>(`${this.base}/${id}`)
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

