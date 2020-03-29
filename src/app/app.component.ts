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
    const formData = new URLSearchParams();
    formData.set('_csrf', this.cookieService.get('XSRF-TOKEN'));
    this.http.post('http://localhost:8080/logout',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      }).pipe(
        finalize(() => {
          this.app.authenticated = false;
          this.router.navigateByUrl('/login');
        })
      ).subscribe();
  }

}
