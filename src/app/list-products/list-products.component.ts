import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { detailProduit } from '../models/detailProduit';
import { fournisseur } from '../models/fournisseur';

import { Product } from '../models/product';
import { ProductImage } from '../models/ProductImage';
import { produit } from '../models/produit';
import { rayon } from '../models/rayon';
import { stock } from '../models/stock';
import { ProductServiceService } from '../product-service.service';
import { FournisseursService } from '../services/fournisseurs.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [ProductServiceService]
})
export class ListProductsComponent implements OnInit {
  Listproduit:produit[];
  Listproduit1:produit[];
  ListProduct:Product[];
  Listproduit2:produit[];
  Listcopy:produit[];
  p7:produit;
  revenebrut1:number;
  count: number;
  iss:boolean=false;
  isShowing: boolean = false;
  formProduct: FormGroup;
  formasign:FormGroup;
  listfourni:fournisseur[];
listrevenue:number[];  
revenue1:number;
revenue6:number =0;
count1: number = 0;
p9:produit={
  idProduit: 0,
  code: '',
  libelle: '',
  prixUnitaire: 0,
  rayon: new rayon,
  stock: new stock,
  detailProduit: new detailProduit,
  fournisseurs: [],
  productImage:null
}
  c:number = 0;
 search="";
 url:string="";
  product: Product = new Product();
  
  Produit:produit={
    idProduit: 0,
    code: '',
    libelle: '',
    prixUnitaire: 0,
    rayon: new rayon,
    stock: new stock,
    detailProduit: new detailProduit,
    fournisseurs: [],
    productImage:null
  }
  p3:produit={
    idProduit: 0,
    code: '',
    libelle: '',
    prixUnitaire: 0,
    rayon: new rayon,
    stock: new stock,
    detailProduit: new detailProduit,
    fournisseurs: [],
    productImage:null
  }
   p1:produit={
     idProduit: 0,
     code: '',
     libelle: '',
     prixUnitaire: 0,
     rayon: new rayon,
     stock: new stock,
     detailProduit: new detailProduit,
     fournisseurs: [],
     url: '',
     productImage:null
   };
   p2:produit={
    idProduit: 0,
    code: '',
    libelle: '',
    prixUnitaire: 0,
    rayon: new rayon,
    stock: new stock,
    detailProduit: new detailProduit,
    fournisseurs: [],
    productImage:null
  };
  confirmation = false;
  p: Product;
  libelle5:string;
  lib:any;

  pAdd: Product;

  constructor(private productService: ProductServiceService,private sanitizer: DomSanitizer, private produitService:ProductsService, private fs: FournisseursService) { }

  ngOnInit(): void {
    this.getproduit();

    this.formProduct = new FormGroup({

    id: new FormControl(''),
    code: new FormControl('',[Validators.required]),
    libelle: new FormControl('',[Validators.required]),
    prixUnitaire: new FormControl('',[Validators.required]),
    categorieProduit: new FormControl('',[Validators.required]),
    idRayon: new FormControl('',[Validators.required]),
    idStock: new FormControl('',[Validators.required]),
    url: new FormControl('')
    });
    //this.getproducts();

    this.formasign=new FormGroup({
      idproduit:new FormControl(''),
      idFournisseur:new FormControl('')
    })
   
  }
  getproduit(){
   this.produitService.getAllProducts().subscribe((res)=>{
     console.log(res);
     this.Listproduit=res
     this.Listproduit.forEach(product => {
      
       product.productImage.data= this.ConvertToSrc(product.productImage.data);
       //this.Listproduit.push(product);
       
    });
    //this.Listproduit=res; 
   })
   //this.produitService.getallRevenueBrutact().subscribe((res)=>{
     //this.listrevenue=res;})
  }

  getproducts(){
    this.produitService.getAllProducts().subscribe((res)=>{
      
     //this.Listproduit1=res; 
     this.Listcopy=res;
     this.Listcopy.forEach(product => {
      
      product.productImage.data= this.ConvertToSrc(product.productImage.data);
      //this.Listproduit.push(product);
      
   });
     this.Listproduit=this.Listcopy.filter((produit)=>
     {return produit.libelle.includes(this.search)});
    })
   }
   getrevenuebrut(id:number,date:Date){
    this.produitService.getRevenueBrutact(id,date).subscribe(res=>{
      alert("Revenu Brut of Product "+id+" = "+ res)
    })
  }
   
  
   

  countByLibelle(lib: string){
    //this.ListProduct = [];
    //this.ListProduct.push(this.productService.getNbProductsByLibelle(lib));
    //products = this.ListProduct;
    this.produitService.getAllProducts().subscribe((res)=>{

      this.Listproduit2=res;})
      if(this.count1 == 0){
        for(let i of this.Listproduit2){
          if(i.libelle == lib)
            this.count1++;
          else
            this.count1;
        }
      }
      this.c = this.count1
      this.count1=0;
      
    
  
    return this.c ;
  }

  b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
  ConvertToSrc(data:any){
    let b64 = this.b64toBlob(data);
    let objectURL = URL.createObjectURL(b64)
    return this.sanitizer.bypassSecurityTrustUrl(objectURL)
  }

getp(id:number,date:Date){
 this.produitService.getOneProductById(id).subscribe(res=>{

  this.p9=res;
 })
 this.produitService.getRevenueBrutact(id,date).subscribe(res=>{
  this.revenue6=res;
})
}



















  addproduit(){
    
  this.p1.code=this.formProduct.value['code'];
  
    this.p1.libelle=this.formProduct.value['libelle'];
    this.p1.prixUnitaire=this.formProduct.value['prixUnitaire'];
    this.p1.detailProduit.categorieProduit=this.formProduct.value['categorieProduit'];
    
    this.p1.url = this.formProduct.value['url'];

    console.log(this.p1.url);

    this.produitService.addProduct(this.p1,this.formProduct.value.idRayon,this.formProduct.value.idStock).subscribe(res=>{
      alert("Product added successfully");
      this.getproduit();
      this.formProduct.reset();}
      ),
      err => 
      alert("Something went wrong");

  }
  
 
  assignftop(){
    this.fs.getOneFournisseur(this.formasign.value.idFournisseur).subscribe(res1 => this.lib = res1.libelle);
    this.produitService.assignfournisseurtoproduit(this.formasign.value.idFournisseur,this.formasign.value.idproduit).subscribe(
      (res)=>{
        this.produitService.getOneProductById(this.formasign.value.idproduit).subscribe(res=>{
          this.libelle5=res.libelle;

          alert(" Le produit " + res.libelle +" est ajouter au fournisseur "+ this.lib)
        });
      this.libelle5="";
      }
    )}



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

  
  deleteProduit(p5:produit){
this.p2=p5;
if(this.confirmation){
  this.produitService.deleteProduct(this.p2.idProduit).subscribe(res=>{
   this.getproduit();
 })
}
  }
  
  oui(){
    this.confirmation = true;
    this.deleteProduit(this.p2);
  }
   getfournisseurs(id:number){
this.produitService.getlistfournisseurbyproduit(id).subscribe(res=>{
this.listfourni=res;
})

   }

  show(){
    if(this.isShowing==true)
      this.isShowing=false;
    else
      this.isShowing=true;  
  }
  

  /*updateProduct(p: Product, id: number){
    this.product.id = p.id;

    this.formProduct.controls['id'].setValue(p.id);
    this.formProduct.controls['code'].setValue(p.code);
    this.formProduct.controls['libelle'].setValue(p.libelle);
    this.formProduct.controls['prixunitaire'].setValue(p.prixunitaire);
    this.formProduct.controls['tauxTva'].setValue(p.tauxTva);
  }*/
     updateproduit(p:produit, id:number){
       this.Produit.code=p.code;
       this.Produit.idProduit=p.idProduit;
       this.Produit.detailProduit.categorieProduit=p.detailProduit.categorieProduit;
       this.Produit.libelle=p.libelle;
       this.Produit.prixUnitaire=p.prixUnitaire;
       this.Produit.rayon.idRayon=p.rayon.idRayon;
       this.Produit.stock.idStock=p.stock.idStock;
  
      this.formProduct.controls['id'].setValue(this.Produit.idProduit);
      this.formProduct.controls['code'].setValue(this.Produit.code);
      this.formProduct.controls['libelle'].setValue(this.Produit.libelle);
      this.formProduct.controls['prixUnitaire'].setValue(this.Produit.prixUnitaire);
      this.formProduct.controls['idRayon'].setValue(this.Produit.rayon.idRayon);
      this.formProduct.controls['idStock'].setValue(this.Produit.stock.idStock);
    this.formProduct.controls['categorieProduit'].setValue(this.Produit.detailProduit.categorieProduit)
     }
     update1(){
       this.p3.idProduit=this.formProduct.value.id;
       this.p3.code=this.formProduct.value.code;
       this.p3.libelle=this.formProduct.value.libelle;
       this.p3.prixUnitaire=this.formProduct.value.prixUnitaire;
       this.p3.detailProduit.categorieProduit=this.formProduct.value.categorieProduit;
       this.produitService.updateProduct(this.p3,this.formProduct.value.idRayon,this.formProduct.value.idStock).subscribe(
         ()=>{
           alert('Product edited');
           this.getproduit();
           this.formProduct.reset();
         }

       )
      
       res=>alert("Something went wrong")
     }
  

}
