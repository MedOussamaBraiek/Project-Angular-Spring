import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';




@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = "http://localhost:8089/SpringMVC/clients"

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getAllClient():Observable<Client[]>{
    return this.http.get<Client[]>(this.url + "/get-all");
  }

  addClient(client: Client):Observable<Client>{
    return this.http.post<Client>(this.url + "/add", client, this.httpOptions);
  }

  deleteClient(id: number){
    return this.http.delete<Client>(this.url + "/remove/" + id);
  }

  updateClient(data: any){
    return this.http.put<Client>(this.url + "/modify" , data, this.httpOptions);
  }

  getOneById(id:number):Observable<Client>{
    return this.http.get<Client>(this.url+`/client/${id}`);
  }

  getChiffreAffaireParCategorieClient(cat:string, d1:Date, d2:Date):Observable<number>{
    return this.http.get<number>(this.url+`/getTotal/${cat}/${d1}/${d2}`);
  }
}
