import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  public count: number;

  constructor( private http: HttpClient) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product : any) {
    this.cartItemList.push(product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number{
    let total = 0;
    this.cartItemList.map((a:any) => {
      total = a.total;
    })
    return total;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a:any , index: any) => {
      if(product.id === a.id){
        this.cartItemList.splice(index,1);
      }
    })
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
