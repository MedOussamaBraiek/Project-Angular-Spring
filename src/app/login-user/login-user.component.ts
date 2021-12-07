import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { Login } from '../models/login';
import { User } from '../models/users';
import { ClientsService } from '../services/clients.service';
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

  clients: Client[];

  ClientConnecte: number;

  id: any;

  text1: string = "Login";
  text2: string = "Sign into your account";

  show1 = false;
  constructor(private data: UserService, private router: Router, private f: FormBuilder, private http: HttpClient, private cs: ClientsService) { }

  @Output() log = new EventEmitter<Login>();

  ngOnInit(): void {
    this.getAll()
    this.myForm = this.f.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z]*@gmail.com')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
getAll(){
  this.cs.getAllClient().subscribe(res => {
    console.log(res);
  })
}

  login(myForm: FormGroup) {
    this.cs.getAllClient().subscribe(res => {
      console.log(res);

      this.clients = res;

      this.clients.forEach(client =>
        {
          if (client.email === myForm.controls['email'].value &&
            client.password === myForm.controls['password'].value) {

            this.text1 = "Welcome";
            this.text2 = client.prenom + " " +client.nom;
            alert('Successfully Loged In')
            this.find=true;
            this.reset();

            this.ClientConnecte = client.idClient;
            this.router.navigate(['/shop/'+this.ClientConnecte]);
          }

        })
          if(this.find == false) {
            alert('please give a valid account')
            this.text1 = 'please give a valid account'
          }


    });


      }



  // login(myForm: FormGroup) {
  //   this.data.getAllUserFromDb().subscribe(res => {
  //     this.list = res;
  //   });
  //   this.list.forEach((user) =>
  //     {
  //       if (user.email === myForm.controls['email'].value &&
  //         user.password === myForm.controls['password'].value) {
  //         //this.router.navigate(['/']);
  //         this.text1 = "Welcome";
  //         this.text2 = user.firstName + " " +user.lastName;
  //         alert('Successfully Loged In')
  //         this.find=true;
  //         this.reset();
  //       }

  //     })
  //       if(this.find == false) {
  //         alert('please give a valid account')
  //         this.msg = 'please give a valid account'
  //       }

  //     }



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
