import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Login } from '../models/login';
import { User } from '../models/users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [UserService]
})
export class ListUserComponent implements OnInit {

  prop1 = "test";
  prop2 = "test2";
  prop3 = "test3";
  searchVal = "";
  list: User[];
  listIn: User[];

  showUpdate= true;

  constructor(private ac:ActivatedRoute, private us:UserService) { }

  show=true;
  showAdd=false;

  test=false;

  newClient: User;

  userForm: FormGroup;

  clientObg: User = new User();

  confirmation = false;
  u: User;

  ngOnInit(): void {  //declancher automatiquement apres le constructeur
    
    this.getAllClients();

    this.userForm = new FormGroup({
      IdCustomer: new FormControl(''),
      firstName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]{3,}?")]),
      lastName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]{3,}?")]),
      birthDate: new FormControl('',[Validators.required]),
      email : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@gmail.com")]),
      password : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}?")]),
      profession: new FormControl('',[Validators.required]),
      accountCategory: new FormControl('Customer')
    })
    
  };


  // addUsr(i: User){
  //   //this.list.push(i);
  //   this.newClient = i;
  //   console.log(i);
  //   this.us.addClient(i).subscribe(
  //     () => {
  //       console.log('Enregistrement terminé !');
  //     },
  //     (error) => {
  //       console.log('Erreur ! : ' + error);
  //     }
  //   );
  // }

  getAllClients(){
    this.us.getAllUserFromDb().subscribe(res =>{
      this.list=res;
      this.listIn = this.list;

      this.ac.paramMap.subscribe(res => {
        //console.log(res.get('cat')),
        this.list = this.listIn.filter((user)=>{
          return user.accountCategory == res.get('category');
        })
      })
    } )
  }


  getUserCategory(c:string){
    if (c == 'Admin'){
      return true;
    }else{
      return false;
    }
 }

 deleteUser(user: User){
   this.u = user;
   if(this.confirmation){
    this.us.deleteClient(user.id)
    .subscribe(res=>{
      this.getAllClients();
     })
   } 
 }

 oui(){
  this.confirmation = true;
  this.deleteUser(this.u);
}


 updateClient(user: User, id:number){
  this.clientObg.id = user.id;
  this.clientObg.picture = user.picture;
  this.clientObg.accountCategory = user.accountCategory;

   this.userForm.controls['IdCustomer'].setValue(user.id);
   this.userForm.controls['firstName'].setValue(user.firstName);
   this.userForm.controls['lastName'].setValue(user.lastName);
   this.userForm.controls['email'].setValue(user.email);
   this.userForm.controls['password'].setValue(user.password);
   this.userForm.controls['birthDate'].setValue(user.birthDate);
   this.userForm.controls['profession'].setValue(user.profession);
 }


 update() {
  this.clientObg.firstName = this.userForm.value.firstName;
  this.clientObg.lastName = this.userForm.value.lastName;
  this.clientObg.email = this.userForm.value.email;
  this.clientObg.password = this.userForm.value.password;
  this.clientObg.birthDate = this.userForm.value.birthDate;
  this.clientObg.profession = this.userForm.value.profession;

  this.us.updateClient(this.clientObg, this.clientObg.id)
  .subscribe(()=> {
  alert("Client edited");
     this.getAllClients();
  })
  //this.showUpdate = false;
 }


//  updateClient(user: User){
//    console.log(user)
//   this.us.list[this.us.list.indexOf(user)].firstName = user.firstName;

//   this.us.updateClient(user, user.id)
//   .subscribe(res => {
//     alert("Update successfully");
//   })
//  }

 changeValue(x:string){
   this.prop2=x;
 }



showForm(){
    this.showAdd=true;
    this.show=false;
}

logg(o: Login){
  for(let i of this.list){
    if((i.email == o.email)&&(i.password == o.pwd)){
      alert("You are loged in");
      console.log("You are loged in");
      this.test=true;
    }
      
    else{
      alert("Wrong pwd");
      console.log("Wrong pwd");
    }
      
  }
}

}
