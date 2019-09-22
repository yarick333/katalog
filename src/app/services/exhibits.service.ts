import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService {
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://localhost:3000/exhibits').pipe(
      map(res => {
        console.log('res', res);
        return res;
      })
    );
  }
}
