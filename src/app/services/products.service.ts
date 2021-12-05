import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url : string = "http://localhost:8089/SpringMVC/products"

  url1 : string = "http://localhost:8089/SpringMVC/fournisseurs"

  httpOptions = {headers : new HttpHeaders({
    'Content-Type':'application/json'
  })}
  constructor(private http : HttpClient) { }

  getAllProducts():Observable<produit[]>{
    return this.http.get<produit[]>(this.url+"/get-all");
   }

   getOneProductById(idProduct:number):Observable<produit>{
     return this.http.get<produit>(this.url+`/get-one/${idProduct}`);
   }
   updateProduct(data: produit,idRayon,idStock){
    return this.http.put<produit>(this.url+`/modify/${idRayon}/${idStock}`,data,this.httpOptions);
    
  }
   addProduct(productToAdd:produit,idRayon,idStock):Observable<produit>{
     return this.http.post<produit>(this.url+`/add/${idRayon}/${idStock}`,productToAdd,this.httpOptions)
   }
    deleteProduct(idProduct:number){
    return this.http.delete<produit>(this.url+'/remove'+`/${idProduct}`)
      }
   getByCategorie(categorie : string):Observable<produit[]>{
     return this.http.get<produit[]>(this.url+'/categorie'+`/${categorie}`);
   }

   getByLibelle(libelle : string):Observable<produit[]>{
    return this.http.get<produit[]>(this.url+'/libelle'+`/${libelle}`);
  }

   assignProdToStock(idProduit:number , idStock:number,data:produit):Observable<any>{
    return this.http.put<any>(this.url+'/assignProdToStock'+`/${idProduit}`+`/${idStock}`,data);
  }

  ///revenueBrut/{id-produit}/{date-debut}/{date-fin}

  getRevenueBrut(idProduit:number , date1 : Date , date2 : Date):Observable<any>{
    return this.http.get<number>(this.url+'/revenueBrut'+`/${idProduit}`+`/${date1}`+`/${date2}`);
  
  }
  getRevenueBrutact(idProduit:number , date1 : Date ):Observable<any>{
    return this.http.get<number>(this.url+'/revenueBrutact'+`/${idProduit}`+`/${date1}`);
  
  }
  getallRevenueBrutact():Observable<number[]>{
    return this.http.get<number[]>(this.url+'/allrevenueBrutact');
  
  }

  assignfournisseurtoproduit(idfournisseur:number,idProduit:number){
    return this.http.put<produit>(this.url1+`/${idfournisseur}`+'/assign'+`/${idProduit}`,this.httpOptions);
    }
}
