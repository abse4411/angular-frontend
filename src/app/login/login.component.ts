import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicce/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  error:boolean=false;

  constructor(
    private app: AuthService, 
    private http: HttpClient, 
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
        this.router.navigateByUrl('/');
    });
    return false;
  }
}
