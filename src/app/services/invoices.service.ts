import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facture } from '../models/facture';


@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  url:string = "http://localhost:8089/SpringMVC/factures"

  httpOptions = {headers : new HttpHeaders({
    'Content-Type':'application/json'
  })}
  
  constructor(private http : HttpClient) { }

  getOneFacture(id:number):Observable<facture>{
    return this.http.get<facture>(this.url+"/get-one/"+`${id}`);
  }

  getAllFactures():Observable<facture[]>{
    return this.http.get<facture[]>(this.url + "/get-all");
  }

  addFacture(data:facture,idClient:number):Observable<facture>{
    return this.http.post<facture>(this.url+'/add'+`/${idClient}`,data, this.httpOptions);
  }

  getByClient(idClient:number):Observable<facture[]>{
    return this.http.get<facture[]>(this.url+ "/getByClient"+ `/${idClient}`);
  }

  getChifreBetweenDates(categorie:string,date1:Date,date2:Date):Observable<number>{
    return this.http.get<number>(this.url+`/${categorie}`+`/${date1}`+`/${date2}`);
  }
  cancelFacture(id:number,data:facture):Observable<any>{
   return  this.http.put(this.url+'/cancel'+`/${id}`,data);
  }
}
