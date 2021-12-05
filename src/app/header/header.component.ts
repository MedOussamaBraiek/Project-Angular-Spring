import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturesService } from '../services/factures.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public count1: number = 0;
  p:string;
  constructor(private fs: FacturesService, private router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.fs.getProducts()
    .subscribe(res => {
      this.count1 = res.length;
    })
  }

  navigate(){
    this.rout.paramMap.subscribe(res => {this.p = res.get('ClientConnecte');});
    this.router.navigate(['/facture/'+this.p]);
  }

}
