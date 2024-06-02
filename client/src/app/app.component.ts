import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  server = true;
  user:any ;
  ApiService: any;

  constructor(private apiService: ApiService) { 


  }ngOnInit(): void {
    this.apiService.getWeather().subscribe({
      next: res=>this.user = res,
      error: error => console.log(error),
      complete: () =>console.log("Request completed")
      
    })
  }
;
 
}
