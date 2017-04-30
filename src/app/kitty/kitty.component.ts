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

  public flights : any[] = [];
  private coordinates: any[] = [];
  private gMapApiKey: string = 'AIzaSyBoGIkzOAHulF1qinLaP-lk1nSfflxiNGg';

  constructor(private kittyService:KittyService) { }

  ngOnInit() {
    let locations: any[] = Constants.locations;
    let travellers: any[] = Constants.travellers;
    travellers.forEach(traveller => {
      this.kittyService.getFlight(traveller[0].startDate, traveller[0].endDate)
        .subscribe(
          subscr => {
            let flight: any = subscr;
            flight.location = locations.find(location => location.Id == flight.place.code);
            flight.traveller = traveller;
            this.flights.push(flight);

            let coords: string[] = flight.location.Location.split(", ");
            this.coordinates.push({lat: coords[0], lon: coords[1]});

            console.log(coords);
            console.log(flight);
          },
          err => console.log(err)
        );
      })
    

    var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            // mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
  }

}
