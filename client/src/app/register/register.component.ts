import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model:any = {};

  usersFromHome = input.required<any>(); /// Alternae way
  // @Input() usersFromHome:any ;

  register(){
      console.log(this.usersFromHome);
  }
  cancel(){
    console.log("cancled");
  }
}
