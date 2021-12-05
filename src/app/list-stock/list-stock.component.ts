import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { stock } from '../models/stock';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent implements OnInit {
  showAddStock:boolean = false ;
  showUpdateStock:boolean = false ;
  stockToUpdate: stock ;
  addStockForm:FormGroup;
  updateStockForm:FormGroup;
  listStock:stock[]=[];
  constructor(private http : StocksService,private route :Router) { }



  ngOnInit(): void {
    this.getAllStocks();
    this.addStockForm = new FormGroup({
      // idStock:new FormControl(),
      qte:new FormControl(''),
      qteMin:new FormControl(''),
      libelleStock:new FormControl('')
    })

  }

  showForm(){
    this.showAddStock = true ;
  }

  closeForm(){
    this.showAddStock = false ;
  }

  getAllStocks(){
    this.http.getAllStocks().subscribe(
      (res)=>{
        this.listStock = res ;
      }
    )
  }

  addStock(){
    this.http.addStock(this.addStockForm.value).subscribe(
      res=>{
        console.log(res);
        alert("stock"+ res.libelleStock+ " added");
        this.addStockForm.reset();
        this.showAddStock=false;
        this.getAllStocks();

      }
    )
  }

  deleteStock(s:stock){
    console.log(s);
    if(confirm("are u sure that u want to delete this " +s.libelleStock + " stock from db ?"))
    {
      this.http.deleteStock(s.idStock).subscribe(
        res=>this.getAllStocks()
      )
    }
  }

  updateStock(s:stock){
    this.showUpdateStock=true ;
    this.updateStockForm=new FormGroup({
      idStock:new FormControl(s.idStock),
      qte:new FormControl(s.qte),
      qteMin:new FormControl(s.qteMin),
      libelleStock:new FormControl(s.libelleStock)
    })
  }
  update(){
    this.stockToUpdate = this.updateStockForm.value;
    this.http.updateStock(this.stockToUpdate).subscribe(
      ()=>{
        this.getAllStocks();
      }
    )
  }

}
