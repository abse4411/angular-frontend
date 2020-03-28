import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../servicce/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Demo';
  greeting = {};
  
  constructor(
    private app: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/resource',{
      withCredentials:true 
    }).subscribe(data => this.greeting = data);
  }

  authenticated() { return this.app.authenticated; }

}
