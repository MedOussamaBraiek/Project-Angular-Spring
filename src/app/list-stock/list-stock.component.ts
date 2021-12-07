import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { produit } from '../models/produit';
import { stock } from '../models/stock';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})


export class ListStockComponent implements OnInit {
  stockToUpdate: stock ;
  addStockForm:FormGroup;
  updateStockForm:FormGroup;
  listStock:stock[]=[];
  imgAlimentaire:string="/assets/stocksImages/food.jpg";
  imgElectromenager:string="/assets/stocksImages/electro.jpg";
  imgQui:string="/assets/stocksImages/qui.jpg";
  imgDefault:string="/assets/stocksImages/cart.jpg"
  stockDetails:any;
  listOfProducts:produit[]=[];

  constructor(private http : StocksService,private route :Router) { }



  ngOnInit(): void {
    this.getAllStocks();
    this.addStockForm = new FormGroup({
      // idStock:new FormControl(),
      qte:new FormControl(''),
      qteMin:new FormControl(''),
      libelleStock:new FormControl(''),
      categorieStock:new FormControl('')

    })

    this.updateStockForm = new FormGroup({
      idStock:new FormControl(''),
      qte:new FormControl(''),
      qteMin:new FormControl(''),
      libelleStock:new FormControl(''),
      categorieStock:new FormControl('')
    })
  }


  getAllStocks(){
    this.http.getAllStocks().subscribe(
      (res)=>{
        this.listStock = res ;
        this.listStock.forEach(element => {
          console.log(element);

          if(element?.categorieStock=='All'){
            element.img=this.imgDefault
          }
          else if(element.categorieStock=='Electromenager'){
            element.img=this.imgElectromenager
          }
          else if(element.categorieStock=='Quicaillerie'){
            element.img=this.imgQui
          }
          else{
            element.img=this.imgAlimentaire
          }
        });
      }
    )
  }

  addStock(){
    this.http.addStock(this.addStockForm.value).subscribe(
      res=>{
        console.log(res);
        alert("stock"+ res.libelleStock+ " added");
        this.addStockForm.reset();
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
    this.updateStockForm.patchValue({
      idStock:s.idStock,
      qte:s.qte,
      qteMin:s.qteMin,
      libelleStock:s.libelleStock,
      categorieStock:s.categorieStock
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

findThisOne(data:stock){
  this.http.getProductsByStock(data.idStock).subscribe((res)=>{
    console.log(res);
    this.listOfProducts=res;
  })
}

}
