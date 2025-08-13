import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ApiClientService } from "../http/api-client.service";
import { FeedingSchedule, FeedingScheduleCreate } from "../../models/feeding.model";

@Injectable({ providedIn: 'root'})
export class FeedingApiService {
    private api = inject(ApiClientService);

    getByAnimal(animalId: number): Observable<FeedingSchedule[]> {
        return this.api.get<FeedingSchedule[]>(`/animals/${animalId}/feeding-schedules`);
    }

    create(animalId: number, data: FeedingScheduleCreate): Observable<FeedingSchedule> {
    return this.api.post<FeedingSchedule>(`/animals/${animalId}/feeding-schedules`, data);
  }
}

