import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import
import { KittyService } from './kitty.service';
import 'rxjs/add/operator/map';

declare var google: any;


@Component({
  selector: 'app-kitty',
  templateUrl: './kitty.component.html',
  styleUrls: ['./kitty.component.css']
})
export class KittyComponent implements OnInit {

  public flight: any;
  private gMapApiKey: string = 'AIzaSyBoGIkzOAHulF1qinLaP-lk1nSfflxiNGg';

  constructor(private kittyService:KittyService) { }

  ngOnInit() {
    this.kittyService.getFlights()
      .subscribe(
        subscr => {
          this.flight = subscr;
          console.log(subscr);
        },
        err => console.log(err));
    

    var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            // mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
  }

}
