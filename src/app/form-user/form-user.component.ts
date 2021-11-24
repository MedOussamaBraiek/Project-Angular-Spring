import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../models/users';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
  
  usrObj: User = new User();

  constructor(private data: UserService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = new User();


  }

  postUser(form: NgForm){

    this.client = {
      id: form.value.id,
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      birthDate: form.value.birthDate,
      email: form.value.email,
      password: form.value.password,
      profession: form.value.profession,
      accountCategory: form.value.accountCategory,
      picture: form.value.picture
    }
    //this.client.idCustomer = 7;
    let rund = Math.floor(Math.random() * (4 - 1)) + 1;
    this.client.picture = "https://bootdey.com/img/Content/avatar/avatar"+rund+".png";
    this.client.accountCategory = 'Customer';
    console.log(this.client);

    this.data.addClient(this.client)
    .subscribe(res=>{
      console.log(res);
      alert("Client added successfully");
      this.router.navigateByUrl('/user/listuser/Customer');
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
