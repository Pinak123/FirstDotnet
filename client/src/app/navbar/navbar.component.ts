import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule , CommonModule , BsDropdownModule , RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  model:any ={};
  constructor( public accountService:AccountService)
  {
    
  }
  ngOnInit():any{

  };

  login():any{
    this.accountService.login(this.model).subscribe({
      next: response => {
      },
      error: err=> console.log(err)
    })
  }


  loggot():any{
    this.accountService.logout();
  }
}
