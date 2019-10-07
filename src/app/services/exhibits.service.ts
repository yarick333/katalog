import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IExhibitResponse, IExhibitsRespose } from '../models/exhibits';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService {
  constructor(private http: HttpClient) { }

  get(): Observable<IExhibitResponse[]> {
    return this.http.get<IExhibitsRespose>(`${environment.baseUrl}/exhibits`).pipe(
      tap(response => console.log('response', response)),
      map(response => response.objects)
    );
  }
}
