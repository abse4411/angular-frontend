import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

interface User{
    id:number,
    username:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string='http://localhost:8080/';
  user:User;
  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

        if(!credentials)
            return;
        this.http.get(this.baseUrl+'login').pipe(
            finalize(()=>{
                let formData=new URLSearchParams();
                formData.set('username',credentials.username);
                formData.set('password',credentials.password);
                this.http.post<User>(this.baseUrl+'login',formData.toString(),{
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    }
                }).subscribe(response => {
                    if (response) {
                        this.authenticated = true;
                        this.user=response;
                        console.log(this.user);
                    }
                    else{
                        this.authenticated = false;
                    }
                    return callback && callback();
                });
            })
        ).subscribe();
    }
}
