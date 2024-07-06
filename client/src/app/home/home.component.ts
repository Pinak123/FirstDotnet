import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { AccountService } from '../_services/account.service';
import { ApiService } from '../api.services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HttpClientModule, CommonModule,RegisterComponent]
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(public accountService : AccountService ,private apiService: ApiService){}

  ngOnInit(): void {
    this.getUsers();
  }
  regiaterMode = false;


  getUsers(): void {
     this.apiService.getuser().subscribe({
      next: res => this.users = res,
      error: error => console.log(error),
      complete: () => console.log("Request completed")
    });
  }

  registerToggle(){
    this.regiaterMode = !this.regiaterMode;
  }

  cancelRegister(event : boolean){ 
    this.regiaterMode = event;
   } 
}
