import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { User } from '../models/users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  myForm: FormGroup;
  mescnx = []
  liste: Login;
  msg: string;
  list: User[];
  find: boolean = false;

  text1: string = "Login";
  text2: string = "Sign into your account";

  show1 = false;
  constructor(private data: UserService, private router: Router, private f: FormBuilder, private http: HttpClient) { }

  @Output() log = new EventEmitter<Login>();

  ngOnInit(): void {

    this.myForm = this.f.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z]*@gmail.com')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login(myForm: FormGroup) {
    this.data.getAllUserFromDb().subscribe(res => {
      this.list = res;
    });
    this.list.forEach((user) =>
      {
        if (user.email === myForm.controls['email'].value &&
          user.password === myForm.controls['password'].value) {
          //this.router.navigate(['/']);
          this.text1 = "Welcome";
          this.text2 = user.firstName + " " +user.lastName;
          alert('Successfully Loged In')
          this.find=true;
          this.reset();
        }

      })
        if(this.find == false) {
          alert('please give a valid account')
          this.msg = 'please give a valid account'
        }

      }



  // checkUser(myForm: FormGroup) {
  //   this.data.list.forEach(
  //     (user) => {
  //       if (user.email === myForm.controls['email'].value &&
  //         user.password === myForm.controls['password'].value) {
  //         this.router.navigate(['/'])
  //       }
  //       else {
  //         this.msg = 'please give a valid account'
  //       }
  //     }
  //   );
  // }

  reset() {
    this.myForm.reset();
  }

  show(){
    this.show1 = true;
  }

}



    //   const user1 = res.find((a: any) => {
    //     return a.email === this.myForm.value.email && a.password === this.myForm.value.password
    //   });
    //   if(user1){
    //     alert('Successfully Loged In');
    //     this.reset();
    //   }
    //   else
    //     alert('please give a valid account');
    // })
