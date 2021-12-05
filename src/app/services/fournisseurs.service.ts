import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fournisseur } from '../models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  url: string = "http://localhost:8089/SpringMVC/fournisseurs"

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getAllFournisseur():Observable<fournisseur[]>{
    return this.http.get<fournisseur[]>(this.url + "/get-all");
  }

  addFournisseur(fournisseur: fournisseur):Observable<fournisseur>{
    return this.http.post<fournisseur>(this.url + "/add", fournisseur, this.httpOptions);
  }

  deleteFournisseur(id: number){
    return this.http.delete(this.url+"/remove/"+id);
  }

  updateFournisseur(data: any){
    return this.http.put<fournisseur>(this.url + "/modify" , data, this.httpOptions);
  }
}
