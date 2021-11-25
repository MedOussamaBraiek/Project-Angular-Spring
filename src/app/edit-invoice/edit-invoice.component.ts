import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../models/Invoice'

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  @Input() invoiceToEdit: Invoice;
  @Output() edited = new EventEmitter<Invoice>()
  FormInvoice : FormGroup;
  idInvoice = 0;

  constructor() { }

  ngOnInit(): void {

  }


  ngOnChanges(change: SimpleChanges){
    if(change.invoiceToEdit.firstChange){
      this.FormInvoice = new FormGroup({
        idInvoice:new FormControl({value:this.invoiceToEdit.idFacture,disabled:true}),
        discountAmount: new FormControl(this.invoiceToEdit.montantFacture),
        billAmount : new FormControl(this.invoiceToEdit.montantRemise),
        dateBill : new FormControl(this.invoiceToEdit.dateFacture),
        Status: new FormControl(this.invoiceToEdit.active)
      })
    }
    else{
    this.FormInvoice.setControl('idInvoice',new FormControl(this.invoiceToEdit.idFacture));
    this.FormInvoice.setControl('discountAmount',new FormControl(this.invoiceToEdit.montantFacture));
    this.FormInvoice.setControl('billAmount',new FormControl(this.invoiceToEdit.montantRemise));
    this.FormInvoice.setControl('dateBill',new FormControl(this.invoiceToEdit.dateFacture));
    this.FormInvoice.setControl('Status',new FormControl(this.invoiceToEdit.active));
    }
  }

  edit(){
    console.log(this.FormInvoice.getRawValue());
    this.edited.emit(this.FormInvoice.getRawValue());
  }

}
