import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../models/client';
import { detailFacture } from '../models/detailFacture';
import { facture } from '../models/facture';
import { produit } from '../models/produit';
import { ClientsService } from '../services/clients.service';
import { FacturesService } from '../services/factures.service';
import { InvoicesService } from '../services/invoices.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.css']
})
export class DetailFactureComponent implements OnInit {

  factureTotal:facture ;
  public product: produit[] = [];
  public total: number = 1;
  public totalPrice: number =0;
  detailsfacturesToAdd : detailFacture[]=[]
  p:any;

   listQ:number[];


  quantity:number = 1;
  prixTotal: number = 0;
  prixUnitaire:number;

  quantityTotal: number = 0;

  k:number = 0;

  f:facture ={};

  client : Client;

  detailFac1 : detailFacture[];

  p1:any;

  mf:number;
  mr:number;
  n:string;
  prenom:string;
  date:Date;

  constructor(private fs:FacturesService, private rout: ActivatedRoute, private router: Router, private inv: InvoicesService,private clientService:ClientsService,private ps: ProductsService) { }

  ngOnInit(): void {
    this.fs.getProducts()
    //this.ps.getAllProducts()
    .subscribe(res => {
      this.product = res;
      //this.total = this.fs.getTotalPrice();
      console.log(this.product);
    })

  
    for(let i=0; i<this.product.length; i++){
      
      for(let j=0; j<this.product.length; j++){
        if(i !== j){
          if(this.product[i].code === this.product[j].code){
            this.product[i].quantite++;
            this.product.splice(j,1);
            }
          }
    }
    }

    this.product.forEach(p => {
      this.quantityTotal += p.quantite;
      this.prixTotal += (p.prixUnitaire*p.quantite);
    });
    
  }

  deletProduct(produit: any){
    this.fs.removeCartItem(produit);
  }

  deletAllProduct(){
    this.fs.removeAllCart();
    //this.product = [];
  }

  addFacture(){
    this.rout.paramMap.subscribe(res => {this.p1 = res.get('ClientConnecte');});
    var factureTotal:facture = new facture;
    
    this.product.forEach(p => {
      let detailFac : detailFacture = {};
      detailFac.pourcentageRemise = p.remise;
      detailFac.qte = p.quantite;
      
      detailFac.produit = p;
      console.log(detailFac.produit.idProduit)
      this.detailsfacturesToAdd.push(detailFac);
      factureTotal.detailFactures = this.detailsfacturesToAdd;
      factureTotal.active = true;
      console.log(factureTotal);
      this.inv.addFacture(factureTotal,this.p1).subscribe((res)=>{
        factureTotal = res ;
        this.mf = res.montantFacture ;
        this.mr = res.montantRemise ;

        this.date = res.dateFacture;

        this.clientService.getOneById(this.p1).subscribe(
          (res1)=>{
            this.client=res1
            console.log(res1)
            this.n = res1.nom;
            this.prenom = res1.prenom;
          }
        );
        
      })
      
      

    });

  }



/*

*/

  back(){
    this.router.navigate(['/shop/'+this.p]);

  }

}
