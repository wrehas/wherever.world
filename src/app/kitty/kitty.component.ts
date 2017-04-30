import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import
import { KittyService } from './kitty.service';
import 'rxjs/add/operator/map';
import { Constants } from "../constants";

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
    var locations = Constants.locations;
    this.kittyService.getFlights()
      .subscribe(
        subscr => {
          this.flight = subscr;
          this.flight.location = locations.find(location => location.Id == this.flight.place.code);
          console.log(this.flight);
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
