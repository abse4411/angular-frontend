import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicce/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private app: AuthService, 
    private http: HttpClient, 
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.get('http://localhost:8080/logout').pipe(
      finalize(()=>{
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }

}
