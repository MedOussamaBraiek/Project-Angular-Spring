import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  products: Product[];
  count: number = 0;
  c:number = 0;
  constructor(private http: HttpClient) { }


  // getAllProducts(){
  //   this.products=
  //   [
  //     { idProduct: 1, code: 127,libelle: "PC", prixunitaire : 2000, tauxTva :10},
  //     { idProduct: 2, code: 128,libelle: "TV", prixunitaire : 1000, tauxTva :20},
  //     { idProduct: 3, code: 128,libelle: "Table", prixunitaire : 200, tauxTva :30},
  //     ]
  //     return this.products;
  // }

  getNbProductsByLibelle(libelle:string, products: Product[]){
    if(this.count == 0){
      for(let i of products){
        if(i.libelle == libelle)
          this.count++;
        else 
          this.count;
      } 
    }
    this.c = this.count
    this.count=0;
    return this.c;
  }

  apiUrl = 'http://localhost:3000/products/';

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  addProduct(product: Product) : Observable<Product> {
    //console.log(client);
    return this.http.post<Product>(this.apiUrl,product, this.httpOptions);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.apiUrl+id)
    .pipe(map((res: any)=> {
      return res;
    }))
  }

  updateProduct(data: any, id: number){
    return this.http.put<any>(this.apiUrl+id,data,this.httpOptions)
    .pipe(map((res: any)=> {
      return res;
    }))
  }
}
