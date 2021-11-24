import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [ProductServiceService]
})
export class ListProductsComponent implements OnInit {

  ListProduct:Product[];
  count: number;
  isShowing: boolean = false;
  formProduct: FormGroup;

  product: Product = new Product();

  confirmation = false;
  p: Product;

  pAdd: Product;
  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProducts();

    this.formProduct = new FormGroup({

    id: new FormControl(''),
    code: new FormControl('',[Validators.required]),
    libelle: new FormControl('',[Validators.required]),
    prixunitaire: new FormControl('',[Validators.required]),
    tauxTva: new FormControl('',[Validators.required])
    })
    
  }

  getProducts(){
    this.productService.getAllProducts()
    .subscribe(res => this.ListProduct = res);
  }

  countByLibelle(lib: string,products: Product[]){
    //this.ListProduct = [];
    //this.ListProduct.push(this.productService.getNbProductsByLibelle(lib));
    //products = this.ListProduct;
    return this.count = this.productService.getNbProductsByLibelle(lib.toLocaleUpperCase(),products);
  }


  
  addProductt(){
    this.pAdd = this.formProduct.value;

    this.productService.addProduct(this.pAdd)
    .subscribe(res => {
      console.log(res);
      alert("Product added successfully");
      this.getProducts();
      this.formProduct.reset();
    }),
    err => 
      alert("Something went wrong");
  }




  // addProductt(p: Product){
  //   this.pAdd = p;

  //   this.productService.addProduct(p)
  //   .subscribe(res => {
  //     console.log(res);
  //     alert("Product added successfully");
  //     this.getProducts();
  //   }),
  //   err => 
  //     alert("Something went wrong");
  // }

  deleteProductt(p: Product){
    this.p = p;
    if(this.confirmation){
      this.productService.deleteProduct(p.id)
      .subscribe(res=>{
       this.getProducts();
     })
    }
  }

  oui(){
    this.confirmation = true;
    this.deleteProductt(this.p);
  }


  show(){
    if(this.isShowing==true)
      this.isShowing=false;
    else
      this.isShowing=true;  
  }


  updateProduct(p: Product, id: number){
    this.product.id = p.id;

    this.formProduct.controls['id'].setValue(p.id);
    this.formProduct.controls['code'].setValue(p.code);
    this.formProduct.controls['libelle'].setValue(p.libelle);
    this.formProduct.controls['prixunitaire'].setValue(p.prixunitaire);
    this.formProduct.controls['tauxTva'].setValue(p.tauxTva);
  }

  update(){
    this.product.code = this.formProduct.value.code;
    this.product.libelle = this.formProduct.value.libelle;
    this.product.prixunitaire = this.formProduct.value.prixunitaire;
    this.product.tauxTva = this.formProduct.value.tauxTva;

    this.productService.updateProduct(this.product, this.product.id)
    .subscribe(()=> {
      alert('Product edited');
      this.getProducts();
    })
  }

}
