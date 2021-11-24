import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/users';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

  @Output() addUser = new EventEmitter<User>();

  @Output() errorP = new EventEmitter<string>();

  msgError : String;
  userAddForm: FormGroup;
  constructor(private ad:UserService) { }

  

  show=true;

  ngOnInit(): void {
    this.userAddForm = new FormGroup({
      //IdCustomer: new FormControl(''),
      firstName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]{3,}?")]),
      lastName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]{3,}?")]),
      birthDate: new FormControl('',[Validators.required]),
      email : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@gmail.com")]),
      password : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}?")]),
      profession: new FormControl('',[Validators.required]),
      accountCategory: new FormControl('Customer')
    })
  }


  addUsr(){
    //this.list.push(i);
    //this.newClient = i;
    console.log(this.userAddForm.value);
    this.ad.addClient(this.userAddForm.value).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  add() {
    this.addUser.emit(this.userAddForm.value);
    //console.log(this.userAddForm.value);
    this.userAddForm.reset();
    //this.show=false;
    
  }

  errMsg(m: String){
    this.msgError = m;
  }

  // err(){
  //   return this.userAddForm;
  // }  

  err(){
    return this.userAddForm.controls.errors;
  //   if(this.userAddForm.controls.firstName.errors.required)
  //     return this.msgError="First Name Required";
  //   if(this.userAddForm.controls.firstName.errors.pattern)
  //     return this.msgError="Mauvais First Name pattern"

  //   if(this.userAddForm.controls.lastName.errors.required)
  //     return this.msgError="Last Name Required"
  //   if(this.userAddForm.controls.lastName.errors.pattern)
  //     return this.msgError="Mauvais last Name pattern"

  //   if(this.userAddForm.controls.email.errors.pattern)
  //     return this.msgError="Mauvais email pattern"

  //   if(this.userAddForm.controls.password.errors.pattern)
  //     return this.msgError="Mauvais password pattern"

  //   else
  //     return this.msgError="Oussama"
  // }
  }
}

// firstName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]{3,}?")]),
//       lastName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]{3,}?")]),
//       birthDate: new FormControl('',[Validators.required]),
//       accountCategory: new FormControl('Customer'),
//       email : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@gmail.com")]),
//       password : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}?")]),
//       picture: new FormControl("https://bootdey.com/img/Content/avatar/avatar3.png"),
//       profession: new FormControl('',[Validators.required]),