import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model:any = {};
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  // @Input() usersFromHome:any ;
  // @Output() cancelRegister = new EventEmitter(); // old way
  cancelRegister = output<boolean>()// new way
  registrationToggle = input();
  register(){
    this.accountService.Register(this.model).subscribe({
      next: res =>{
        this.cancel();
        this.router.navigateByUrl('/members')
      },
      error: err => this.toaster.error(err)
    })
  }
  cancel(){

    this.cancelRegister.emit(false)
  
  }
}
