import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private userService:UserService, private toastrService:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){

    if(form !=null){
      form.reset();
    }
    this.user = {
      UserName:'',
      Password:'',
      Email:'',
      FirstName:'',
      LastName:''
    }
  }

  OnSubmit(form : NgForm){
    this.userService.registerUser(form.value).subscribe((data:any)=>{
      if(data.Succeeded==true){
        this.resetForm(form);
        this.toastrService.success('User Registration Successful')
      }
      else{
        this.toastrService.error(data.Errors[0]);
      }
    });
  }

}
