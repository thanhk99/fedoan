import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class usesService {
  private apiURL = 'http://localhost:8082/users'; // Thay đổi URL cho phù hợp

  constructor(private http: HttpClient) {}
    getUsers(): Observable<any> {
      return this.http.get<any>(this.apiURL);
    }
}