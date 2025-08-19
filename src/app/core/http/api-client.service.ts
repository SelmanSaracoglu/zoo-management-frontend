import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Animal } from '../../features/animals/data-access/models/animal.model';

type Params = Record<string, string | number | boolean | null | undefined>;

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBase.replace(/\/$/, '');

  private toParams(params?: Params) {
    if (!params) return undefined;
    const p = new HttpParams({ fromObject: Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ) as Record<string, string> });
    return p;
  }

  get<T>(path: string, params?: Params, headers?: HttpHeaders) {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params: this.toParams(params), headers });
  }

  post<T>(path: string, body: unknown, headers?: HttpHeaders) {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, { headers });
  }

  put<T>(path: string, body: unknown, headers?: HttpHeaders) {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, { headers });
  }

  delete<T>(path: string, params?: Params, headers?: HttpHeaders) {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { params: this.toParams(params), headers });
  }
}