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

  public flight : any;

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
  }

}
