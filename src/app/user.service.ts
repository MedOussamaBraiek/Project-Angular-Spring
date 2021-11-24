import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/users';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  list: User[];
  
  constructor(private myhttp:HttpClient) { }

  apiUrl = 'http://localhost:3000/users/';

  getAllUserFromDb() : Observable<User[]>{
    return this.myhttp.get<User[]>(this.apiUrl);
  }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  addClient(client: any) : Observable<User> {
    //console.log(client);
    return this.myhttp.post<any>(this.apiUrl,client, this.httpOptions)
    .pipe(map((res: any)=> {
      return res;
    }))
  }

  deleteClient(id: number){
    return this.myhttp.delete<any>(this.apiUrl+id)
    .pipe(map((res: any)=> {
      return res;
    }))
  }


  updateClient(data: any, id: number){
    return this.myhttp.put<any>(this.apiUrl+id,data,this.httpOptions)
    .pipe(map((res: any)=> {
      return res;
    }))
  }


  getAllUsers(){
    return this.list=[{
      id: 1,
      firstName: "Mila",
      lastName: " Kunis",
      birthDate: "30-06-1999",
      accountCategory: "Admin",
      email: "mila@kunis.com",
      password: "test",
      picture: "https://bootdey.com/img/Content/avatar/avatar3.png",
      profession: "Software Engineer"
      },
      {
      id: 2,
      firstName: "George",
      lastName: "Clooney",
      birthDate: "10-02-1983",
      accountCategory: "Customer",
      email: "marlon@brando.com",
      password: "test",
      picture: "https://bootdey.com/img/Content/avatar/avatar2.png",
      profession: "Software Engineer"
      },
      {
      id: 3,
      firstName: "George",
      lastName: "Clooney",
      birthDate: "05-03-1987",
      accountCategory: "Customer",
      email: "marlon@brando.com",
      password: "test",
      picture: "https://bootdey.com/img/Content/avatar/avatar1.png",
      profession: "Software Engineer"
      },
      {
      id: 4,
      firstName: "Ryan",
      lastName: "Gossling",
      birthDate:"05-03-2002",
      accountCategory: "Golden",
      email: "Ryan@nicholson.com",
      password: "test",
      picture: "https://bootdey.com/img/Content/avatar/avatar4.png",
      profession: "Software Engineer"
  }]
  }
}
