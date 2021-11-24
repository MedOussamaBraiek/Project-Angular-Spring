import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  FormAddProduct: FormGroup;

  @Output() added = new EventEmitter<Product>()
  constructor() { }

  //number ;

  ngOnInit(): void {
    this.FormAddProduct = new FormGroup({
     // id : new FormControl(""),
      code : new FormControl('',[Validators.required]),
      libelle: new FormControl('',[Validators.required]),
      prixunitaire: new FormControl('',[Validators.required]),
      tauxTva : new FormControl('',[Validators.required]),
    })
  }

  add(){
    //console.log(this.FormAddProduct.value);
    this.added.emit(this.FormAddProduct.value);
    this.FormAddProduct.reset();
  }


}
