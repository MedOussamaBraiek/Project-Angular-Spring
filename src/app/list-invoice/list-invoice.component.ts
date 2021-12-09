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

 
}
