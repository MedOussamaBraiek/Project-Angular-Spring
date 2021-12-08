import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {Loader} from '@googlemaps/js-api-loader';
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit ,AfterViewInit{

  constructor() { }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey:'AIzaSyA9OHr7Z2Ao6pIlbU1R3e6CDmwrv6v6Yc4'
    })

    loader.load().then(()=>{
      new google.maps.Map(document.getElementById("map"),{
        center: { lat: 36.8665, lng: 10.1647 },
        zoom: 15,
      })
    })
  }

}
