import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '../models/Invoice';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  constructor() { }
  invoices: Invoice[];
  invoiceToEdit1: Invoice;
  show=false;
  showAdd=false;
  ngOnInit(): void {
    this.invoices =[
      { idInvoice: 1, discountAmount: 20, billAmount: 500, dateBill:
      "14/07/2021" , Status : true},
      { idInvoice: 2, discountAmount: 10, billAmount: 1000, dateBill:
      "02/10/2020" , Status : false},
      { idInvoice: 3, discountAmount: 50, billAmount: 200, dateBill:
      "15/12/2021" , Status : false},
      ]
  }

  deleteInvoice(i:number){
    this.invoices.splice(i,1);
  }

  showForm(){
    this.showAdd=true;
    this.show=false;
  }

  addInvoice(){

  }
  
  editInvoice(x:Invoice){
    this.show=true;
    this.showAdd=false;
    this.invoiceToEdit1=x;
  }

  
  editMyInvoice(i: Invoice){
    
     for(let k in this.invoices){
       if(this.invoices[k].idInvoice == i.idInvoice){
          this.invoices[k] = i;
       }
     }
  }
  addInv(i: Invoice){
    this.invoices.push(i);
  }
}
