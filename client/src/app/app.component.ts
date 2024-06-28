import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.services';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; // Import BsDropdownModule
import { AccountService } from './_services/account.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HttpClientModule, CommonModule, FormsModule, NavbarComponent]
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  server = true;
  users: any;

  constructor(private apiService: ApiService , public accountService : AccountService) { }

  ngOnInit(): void {
    this.getUsers();
    this.setUsers();
  }

  setUsers(){
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    this.accountService.currentUser.set(user);
  }

  getUsers(): void {
     this.apiService.getuser().subscribe({
      next: res => this.users = res,
      error: error => console.log(error),
      complete: () => console.log("Request completed")
    });
  }
}
