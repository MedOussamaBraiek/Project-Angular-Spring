import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { produit } from '../models/produit';
import { ProductServiceService } from '../product-service.service';
import { FacturesService } from '../services/factures.service';
import { InvoicesService } from '../services/invoices.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public productList: produit[];

  count: number = 0;

  @Output() counted = new EventEmitter<number>()

  public products: any;

  public totalPrice : number;

  p:string;

  public count1: number = 0;
  
  constructor(private router: Router, private fs: FacturesService, private inv: InvoicesService, private rout: ActivatedRoute, private ps: ProductsService) { }

  ngOnInit(): void {



    this.ps.getAllProducts()
    .subscribe(res => {
      this.productList = res;
      //console.log(this.productList);
    })

    this.fs.getProducts()
    .subscribe(res => {
      this.count1 = res.length;
    })
    
  }

  add(product: any) {
    this.fs.addToCart(product);

    this.fs.getProducts()
    .subscribe(res => {
      this.count1 = res.length;
    })
  }

  // addFacture(){
  //   this.rout.paramMap.subscribe(res => {this.p = res.get('ClientConnecte');});

  // }

  navigate(){
    this.rout.paramMap.subscribe(res => {this.p = res.get('ClientConnecte');});
    this.router.navigate(['/facture/'+this.p]);
  }

}
