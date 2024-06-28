import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    baseUrl = 'https://localhost:5000/api/';
    currentUser = signal<User | null>(null);

  constructor(private http:HttpClient) { 

  }

  login(model:any){
    return this.http.post<User>(this.baseUrl+ "accounts/login" , model).pipe(
      map(user => {
        if (user)
          {
            localStorage.setItem("user", JSON.stringify(user));
            this.currentUser.set(user);
          }
      })
    );
  };
  logout(){
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }
}
