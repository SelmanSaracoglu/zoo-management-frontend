import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ApiClientService } from '../../../core/http/api-client.service';
import { FeedLog, FeedingLogCreate } from './models/feed-log.model';

@Injectable({ providedIn: 'root'})
export class FeedLogApiService {
    private api = inject(ApiClientService);

    list(animalId: number): Observable<FeedLog[]> {
      return this.api.get<FeedLog[]>(`/animals/${animalId}/feed-logs`);
    }

    create(animalId: number, body: FeedingLogCreate): Observable<FeedLog> {
      return this.api.post<FeedLog>(`/animals/${animalId}/feed-logs`, body);
    }

    delete(id: number): Observable<void> {
    return this.api.delete<void>(`/feed-logs/${id}`);
    }
  }


