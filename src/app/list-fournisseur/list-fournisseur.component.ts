import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fournisseur } from '../models/fournisseur';
import { FournisseursService } from '../services/fournisseurs.service';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {
  fournisseurs:fournisseur[];
  fournisseursearch:fournisseur[];
  id:number
  ids:string
  fadd:fournisseur=new fournisseur()
  four:fournisseur=new fournisseur()
  fsearch:fournisseur=new fournisseur()
  form:FormGroup
  constructor(private fournisseursService :FournisseursService) { }
  getAll(): void{
     this.fournisseursService.getAllFournisseur().subscribe(l=>{this.fournisseurs=l
    this.fournisseursearch=l})
  }
  ngOnInit(): void {
    this.getAll();
    this.form=new FormGroup({code:new FormControl("",[Validators.required,Validators.pattern("^([a-zA-Z-0-9]+)$")])
    ,libelle:new FormControl("",[Validators.required,Validators.minLength(3)])})
    this.four.code=""
    this.four.libelle=""
    this.fsearch.code=""
    this.fsearch.libelle=""
    this.ids=""
    
   
    
  }
   
  comfirmeDelete(){
    this.getAll()
    this.fournisseursService.deleteFournisseur(this.id).subscribe();
    this.getAll()
   
  }
  selectId(id:number){
    this.id=id; 
    
  }
  selectFournisseur(f:fournisseur)
  {
    this.four=f
    console.log(f)
  }
  updateFournisseur(f:fournisseur)
  {
    this.getAll()
    this.fournisseursService.updateFournisseur(f).subscribe();
    this.getAll()
  }
  get code(){
    return this.form.get("code")
  }
  get libelle(){
    return this.form.get("libelle")
  }
  addFournisseur(){
    this.getAll()
    this.fadd.code=this.form.get("code").value
    this.fadd.libelle=this.form.get("libelle").value
    this.fournisseursService.addFournisseur(this.fadd).subscribe()
    this.getAll()
  }
  chercher(){
    this.fournisseurs=this.fournisseursearch
    if(this.fsearch.code!=="")
    {
      this.fournisseurs= this.fournisseurs.filter(p=>p.code==this.fsearch.code)
    }
    if(this.fsearch.libelle!=="")
    {
      this.fournisseurs= this.fournisseurs.filter(p=>p.libelle==this.fsearch.libelle)
    }
    
  }
  
}
