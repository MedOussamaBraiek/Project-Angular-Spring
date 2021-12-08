import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rayon } from '../models/rayon';
import { RayonsService } from '../services/rayons.service';

@Component({
  selector: 'app-list-rayon',
  templateUrl: './list-rayon.component.html',
  styleUrls: ['./list-rayon.component.css']
})
export class ListRayonComponent implements OnInit {
  showAddRayon:boolean=false;
  showUpdateRayon:boolean = false;
  rayonToUpdate:rayon;
  addRayonForm:FormGroup;
  listRayon:rayon[]=[];
  updateRayonForm: FormGroup;
  constructor(private http : RayonsService) { }

  ngOnInit(): void {
    this.getAllRayon();
    this.addRayonForm = new FormGroup({
      code:new FormControl(''),
      libelle:new FormControl(''),
    })

    this.updateRayonForm=new FormGroup({
      idRayon:new FormControl(),
      code:new FormControl(''),
      libelle:new FormControl('')
    })



  }
  getAllRayon(){
    this.http.getAllRayon().subscribe(
      (res)=>{
        this.listRayon = res ;
      }
    )
  }

  addRayon(){
    this.http.addRayon(this.addRayonForm.value).subscribe(
      res=>{
        console.log(res);
        alert("rayon "+ res.libelle+ " added");
        this.addRayonForm.reset();
        this.getAllRayon();

      }
    )
  }

  deleteRayon(s:rayon){
    console.log(s);
    if(confirm("are u sure that u want to delete this " +s.libelle + " stock from db ?"))
    {
      this.http.deleteRayon(s.idRayon).subscribe(
        res=>this.getAllRayon()
      )
    }
  }

  updateRayon(s:rayon){
    this.updateRayonForm.patchValue({
      idRayon:s.idRayon,
      code:s.code,
      libelle:s.libelle

    })
  }
  update(){
    this.rayonToUpdate = this.updateRayonForm.value;
    this.http.updateRayon(this.rayonToUpdate).subscribe(
      ()=>{
        this.getAllRayon();
      }
    )
  }
}
