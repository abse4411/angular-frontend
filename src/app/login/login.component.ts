import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/servicce/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  credentials: Credentials = { username: '', password: '' };
  error: boolean = false;
  errMsg:string;

  constructor(
    private app: AuthService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.app.authenticate<object>(this.credentials, () => {
        this.router.navigateByUrl('/');
    },
    (result)=>{
      this.error = true;
      alert(result.message);
      this.errMsg=result.message;
    });
  }
}
