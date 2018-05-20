import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  //readonly rootUrl = 'http://localhost:port';
  constructor(private http: HttpClient) { }

  registerUser(user : User){
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post('http://localhost:57166/api/User/Register', body,{headers:reqHeader});
  }

  userAuthentication(username,password){
    var data = "username="+username+"&password="+password+"&grant_type=password";
    var reqHeader = new HttpHeaders({'content-Type':'application/x-www-urlencoded','No-Auth':'True'});
    return this.http.post('http://localhost:57166'+'/token',data,{headers:reqHeader});

  }

  getUserClaims(){
    return this.http.get('http://localhost:57166'+'/api/GetUserClaims');
  }

}
