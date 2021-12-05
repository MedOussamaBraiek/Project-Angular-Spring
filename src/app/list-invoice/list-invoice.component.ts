import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '../models/Invoice';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {
//el id te3 el facture li nhebbou nlawjou aaliha
  factureId : number;
  constructor(private factureS : InvoicesService) { }
  invoices: Invoice[];
  invoiceToEdit1: Invoice;
  show=false;
  showAdd=false;
  invoiceToShow:Invoice;
  ngOnInit(): void {}

  //   this.getAllFactures();

  // }

  // deleteInvoice(i:number){
  //   this.invoices.splice(i,1);
  // }

  // showForm(){
  //   this.showAdd=true;
  //   this.show=false;
  // }

  // editInvoice(x:Invoice){
  //   this.show=true;
  //   this.showAdd=false;
  //   this.invoiceToEdit1=x;
  // }


  // editMyInvoice(i: Invoice){

  //    for(let k in this.invoices){
  //      if(this.invoices[k].idFacture == i.idFacture){
  //         this.invoices[k] = i;
  //      }
  //    }
  // }
  // addInv(i: Invoice){
  //   // add facture must pass an idClient
  //   // facture need to have detail facture to work (pourcentage remise et produitId)
  //   // this.factureS.addFacture(i,1).subscribe(
  //   //   res => {
  //   //     console.log(res);
  //   //     this.invoices.push(res);
  //   //   }

  //   // )
  //   //mech bech t'affichi chay khater 9a3ed tekhou fel données bel base te3 spring
  //   this.invoices.push(i);
  // }

  // // getting data from spring !
  // // getAllFactures(){
  // //   this.factureS.getAllFactures().subscribe(
  // //     res => {
  // //       console.log(res);
  // //       this.invoices = res ;
  // //     }
  // //   )
  // // }

  // getOneById(){
  //   this.factureS.getOneFacture(this.factureId).subscribe(
  //     (res)=>{
  //       console.log(res);

  //     }
  //   )
  // }

}
