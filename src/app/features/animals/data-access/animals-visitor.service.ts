import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../../core/http/api-client.service';
import { VisitorAnimal } from './models/animals-visitor.model';

@Injectable({providedIn: 'root'})
export class AnimalVisitorService {
  private api = inject(ApiClientService);
  private readonly base = '';

  /** GET /api/animals */
  list(): Observable<VisitorAnimal[]> {
    return this.api.get<VisitorAnimal[]>(this.base);
  }

  /** GET /api/animals/{id} */
  getById(id: number): Observable<VisitorAnimal> {
    return this.api.get<VisitorAnimal>(`${this.base}/${id}`);
  }
}