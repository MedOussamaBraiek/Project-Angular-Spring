import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  url:string = "http://localhost:8081/SpringMVC/factures"
  constructor(private http : HttpClient) { }

  getOneFacture(id:number):Observable<Invoice>{
    return this.http.get<Invoice>(this.url+"/get-one/"+`${id}`);
  }

  getAllFactures():Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.url + "/get-all");
  }

  addFacture(data:Invoice,idClient:number):Observable<Invoice>{
    return this.http.post<Invoice>(this.url+'/add'+`/${idClient}`,data);
  }

  getByClient(idClient:number):Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.url+`/${idClient}`);
  }

  getChifreBetweenDates(categorie:string,date1:Date,date2:Date):Observable<number>{
    return this.http.get<number>(this.url+`/${categorie}`+`/${date1}`+`/${date2}`);
  }
  cancelFacture(id:number,data:Invoice):Observable<any>{
   return  this.http.put(this.url+'/cancel'+`/${id}`,data);
  }
}
