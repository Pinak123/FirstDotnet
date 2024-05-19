import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient) { 


  }ngOnInit(): void {
    this.http.get('https://localhost:5273/users').subscribe(
      {
        next: (res)=>this.user = res,
        error: (err)=>console.log(err),
        complete: ()=>{console.log("complete")} 
      }
    );
  }
;
  
  onMouse(){
    this.title = 'Dating app Mouse';
  }
}
