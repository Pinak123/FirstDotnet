import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule , CommonModule , BsDropdownModule , RouterLink , RouterLinkActive , TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  model:any ={};
  user:any = {};
  constructor( public accountService:AccountService , public router:Router , private toastr:ToastrService)
  {
    this.user = accountService.currentUser();
  }
  ngOnInit():any{

  };

  login():any{
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        
      },
      error: err=> this.toastr.error("invalid password")
    })
  }


  loggot():any{
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
