import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import
import { KittyService } from './kitty.service';
import 'rxjs/add/operator/map';
import { Constants } from "../constants";


@Component({
  selector: 'app-kitty',
  templateUrl: './kitty.component.html',
  styleUrls: ['./kitty.component.css']
})
export class KittyComponent implements OnInit {

  public flights : any[] = [];

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
            console.log(flight);
          },
          err => console.log(err)
        );
      })
  }

}
