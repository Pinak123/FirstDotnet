import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.services';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; // Import BsDropdownModule
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [HttpClientModule, CommonModule, FormsModule, NavbarComponent, HomeComponent , RouterModule]
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  server = true;
  users: any;

  constructor(private apiService: ApiService , public accountService : AccountService) { }

  ngOnInit(): void {
    this.setUsers();
  }

  setUsers(){
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    this.accountService.currentUser.set(user);
  }


}
