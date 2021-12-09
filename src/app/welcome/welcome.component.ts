import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  myForm: FormGroup;
  clients: Client[];
  ClientConnecte: number;
  find: boolean = false;

  cl: Client = new Client();
  hide: boolean = false;

  @Output() app = new EventEmitter<boolean>();

  constructor(private f: FormBuilder,private cs: ClientsService, private router: Router) { }

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
      this.clients = res;

      this.clients.forEach(client =>
        {
          if (client.email === myForm.controls['email'].value &&
            client.password === myForm.controls['password'].value) {

            //this.text1 = "Welcome";
            //this.text2 = client.prenom + " " +client.nom;

            if(client.categorieClient === 'Admin') {
              alert('Welcome Boss');
              this.find=true;
              this.router.navigate(['/admin']);
              this.send();
            }
            else{
              alert('Successfully Loged In')
              this.find=true;
              this.send();
              this.myForm.reset();

              this.ClientConnecte = client.idClient;
              this.router.navigate(['/shop/'+this.ClientConnecte]);
            }
          }

        })
          if(this.find == false) {
            alert('please give a valid account')
            //this.text1 = 'please give a valid account'
          }


    });
}


postUser(form: NgForm){

  //this.cl = form.value;
  //console.log(this.cl);
  this.cs.addClient(this.cl)
  .subscribe(res=>{
    //console.log(res);
    alert("Client added successfully");
    // if(this.cl.categorieClient == "Premuim")
    //   this.router.navigateByUrl('/admin/user/listuser/Premuim');
    // else if(this.cl.categorieClient == "Ordinaire")
    //   this.router.navigateByUrl('/admin/user/listuser/Ordinaire');
    // else if(this.cl.categorieClient == "Fidele")
    //   this.router.navigateByUrl('/admin/user/listuser/Fidele');
    this.router.navigateByUrl('/welcome');
  }),
  err =>
    alert("Something went wrong");

}

show(){
  this.hide = true;
}


send(){
  this.app.emit(this.find);
}
}
