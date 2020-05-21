import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/servicce/auth.service';

interface Greet{
  id:string,
  content:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Demo';
  greeting:Greet={
    id:null,
    content:null
  };
  
  constructor(
    private app: AuthService,
    private http: HttpClient
  ) { 
    // http.get('http://localhost:8080/token').subscribe(data => {
    //   const token = data['token'];
    //   http.get<Greet>('http://localhost:9000/', 
    //   {headers : new HttpHeaders().set('X-Auth-Token', token)})
    //     .subscribe(response => this.greeting = response);
    // }, () => {});
    http.get<Greet>('http://localhost:8080/resource').subscribe(data => {
      this.greeting = data;
      console.log(data);
    });
  }
 
  ngOnInit(): void {
    //this.http.get<Greet>('http://localhost:8080/resource').subscribe(data => this.greeting = data);
  }

  public get authenticated():boolean { return this.app.authenticated; }

}
