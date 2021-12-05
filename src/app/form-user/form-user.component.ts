import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../models/users';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  
  myForm: FormGroup;
  //list: User[];

  user: User;
  client: User;

  client1: Client;
  
  usrObj: User = new User();

  cl: Client = new Client();

  constructor(private data: UserService, private router: Router,private formBuilder: FormBuilder, private cs: ClientsService) { }

  ngOnInit(): void {
    this.user = new User();


  }

  postUser(form: NgForm){


    this.cs.addClient(this.cl)
    .subscribe(res=>{
      console.log(res);
      alert("Client added successfully");
      if(this.cl.categorieClient == "Premuim")
        this.router.navigateByUrl('/user/listuser/Premuim');
      else if(this.cl.categorieClient == "Ordinaire")
        this.router.navigateByUrl('/user/listuser/Ordinaire');
      else if(this.cl.categorieClient == "Fidele")
        this.router.navigateByUrl('/user/listuser/Fidele');
    }),
    err => 
      alert("Something went wrong");
    
  }


  save() {
    this.user.accountCategory = 'Customer';
    console.log(this.user)
    this.data.list.push(this.user)
    //this.router.navigate(['/user'])
    this.router.navigateByUrl('/user/listuser/Customer');

  }

}






//   ngOnInit(): void {
//     this.myForm = new FormGroup({
//       firstName: new FormControl('',[Validators.pattern("[a-zA-Z]*")]),
//       lastName: new FormControl('',[Validators.pattern("^[a-zA-Z]*")]),
//       email : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@gmail.com")]),
//       password : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}?")]),
//       category: new FormControl("{value:'Customer',disabled}")
//     })
//   }

//   getname() {
//     //return this.myForm.get('firstName');
//   }

//   ajouter(){
//     this.list.push(this.myForm.getRawValue());
//     this.myForm.reset();
//   }

// }
