import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { produit } from '../models/produit';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  products:produit[];

  constructor(private http:StocksService,private activatedRoute:ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.getStockDetail();
  }

  getStockDetail(){
    let params ;
    this.activatedRoute.paramMap.subscribe(
      res => params = res.get('idStock')
    )
    this.http.getProductsByStock(params).subscribe(
      res => { this.products = res
      console.log(res);
    }
    )
  }
  goBack(){
    this.router.navigateByUrl('/admin/stocks')
  }
}

