import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../models/Invoice';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  @Output() aded = new EventEmitter<Invoice>();
  FormAddInvoice : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.FormAddInvoice = new FormGroup({
      idInvoice: new FormControl(),
      discountAmount: new FormControl(),
      billAmount : new FormControl(),
      dateBill : new FormControl(),
      Status: new FormControl()
    })
  }
  add() {
    this.aded.emit(this.FormAddInvoice.value);
    this.FormAddInvoice.reset();
  }
}
