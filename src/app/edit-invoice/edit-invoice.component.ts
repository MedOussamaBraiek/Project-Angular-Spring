import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../models/Invoice';

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
        idInvoice:new FormControl({value:this.invoiceToEdit.idInvoice,disabled:true}),
        discountAmount: new FormControl(this.invoiceToEdit.discountAmount),
        billAmount : new FormControl(this.invoiceToEdit.billAmount),
        dateBill : new FormControl(this.invoiceToEdit.dateBill),
        Status: new FormControl(this.invoiceToEdit.Status)
      })
    }
    else{
    this.FormInvoice.setControl('idInvoice',new FormControl(this.invoiceToEdit.idInvoice));
    this.FormInvoice.setControl('discountAmount',new FormControl(this.invoiceToEdit.discountAmount));
    this.FormInvoice.setControl('billAmount',new FormControl(this.invoiceToEdit.billAmount));
    this.FormInvoice.setControl('dateBill',new FormControl(this.invoiceToEdit.dateBill));
    this.FormInvoice.setControl('Status',new FormControl(this.invoiceToEdit.Status));
    }
  }

  edit(){
    console.log(this.FormInvoice.getRawValue());
    this.edited.emit(this.FormInvoice.getRawValue());
  }

}
