import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../models/client';
import { facture } from '../models/facture';
import { Login } from '../models/login';
import { User } from '../models/users';
import { ClientsService } from '../services/clients.service';
import { InvoicesService } from '../services/invoices.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  providers: [UserService, ClientsService]
})
export class ListUserComponent implements OnInit {

  prop1 = "test";
  prop2 = "test2";
  prop3 = "test3";
  searchVal = "";
  list: User[];
  listIn: User[];

  list1: Client[];
  listIn1: Client[];

  listFactures: facture[];

  showUpdate= true;

  constructor(private ac:ActivatedRoute, private us:UserService, private cs: ClientsService, private inv: InvoicesService) { }

  show=true;
  showAdd=false;

  test=false;

  newClient: User;

  userForm: FormGroup;

  clientObg: Client = new Client();

  confirmation = false;
  clientDeleted: number;

  listCopy:Client[];
  listClient:Client[];
  search="";

  ngOnInit(): void {  //declancher automatiquement apres le constructeur
    
    //this.getAllClients();

    this.getClientBySpring();

    this.userForm = new FormGroup({
      IdCustomer: new FormControl(''),
      firstName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]{3,}?")]),
      lastName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]{3,}?")]),
      birthDate: new FormControl('',[Validators.required]),
      email : new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9._-]+@gmail.com")]),
      password : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}?")]),
      profession: new FormControl('',[Validators.required]),
      categorie: new FormControl('')
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

  getClientBySpring() {
    this.cs.getAllClient().subscribe(res => {
      this.list1=res;
      this.listIn1 = this.list1;

      this.ac.paramMap.subscribe(res => {
        //console.log(res.get('cat')),
        this.list1 = this.listIn1.filter((user)=>{
          return user.categorieClient == res.get('category');
        })
        
      })
    })
  }

  getClient(){
    this.cs.getAllClient().subscribe((res)=>{
    this.list1=res
  
    this.listIn1=this.list1;
    this.list1=this.listIn1.filter((client)=>
     {return client.nom.includes(this.search)});
     
    })
   }



  deleteClient(id: number){
    this.clientDeleted = id;
      if(this.confirmation){
        this.cs.deleteClient(id)
        .subscribe(res=>{
          this.getClientBySpring();
         })
       } 
  }

  oui(){
    this.confirmation = true;
    this.deleteClient(this.clientDeleted);
  }


  updateClient(client: Client, id:number){
    this.clientObg.idClient = client.idClient;
  
     this.userForm.controls['IdCustomer'].setValue(client.idClient);
     this.userForm.controls['firstName'].setValue(client.prenom);
     this.userForm.controls['lastName'].setValue(client.nom);
     this.userForm.controls['email'].setValue(client.email);
     this.userForm.controls['password'].setValue(client.password);
     this.userForm.controls['birthDate'].setValue(client.dateNaissance);
     this.userForm.controls['profession'].setValue(client.profession);
     //this.userForm.controls['categorie'].setValue(client.categorieClient);
   }
  
  
   update() {
    this.clientObg.prenom = this.userForm.value.firstName;
    this.clientObg.nom = this.userForm.value.lastName;
    this.clientObg.email = this.userForm.value.email;
    this.clientObg.categorieClient = this.userForm.value.categorie;
    this.clientObg.password = this.userForm.value.password;
    this.clientObg.dateNaissance = this.userForm.value.birthDate;
    this.clientObg.profession = this.userForm.value.profession;
  
    this.cs.updateClient(this.clientObg)
    .subscribe(()=> {
    alert("Client edited");
       this.getClientBySpring();
    })
    //this.showUpdate = false;
   }


   getFactures(client: Client){
      this.inv.getByClient(client.idClient)
      .subscribe(res => {
        //console.log(res);
        this.listFactures = res;
      })
   }


  getUserCategory(c:string){
    if (c == 'Admin'){
      return true;
    }else{
      return false;
    }
 }


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
