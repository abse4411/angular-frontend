import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicce/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private app: AuthService,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {

  }

  ngOnInit(): void {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.post('http://localhost:8080/logout',null).pipe(
        finalize(() => {
          this.app.authenticated = false;
          this.router.navigateByUrl('/login');
        })
      ).subscribe();
  }

}
