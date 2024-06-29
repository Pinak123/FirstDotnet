import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Your api url and it should be https
  private apiUrl = 'https://localhost:5000/api/users';

  constructor(private http: HttpClient) { }

  getuser(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }
}
