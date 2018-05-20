import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError:boolean=false;
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(username:string,password:string){
    this.userService.userAuthentication(username,password).subscribe((data:any)=>{
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['/home']);
    },
  (error:HttpErrorResponse)=>{
    this.isLoginError = true;
    console.log(error.message);
    
  })
  }

}
