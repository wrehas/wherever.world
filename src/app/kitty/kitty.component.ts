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
  public locations : any[];

  constructor(private kittyService:KittyService) { }

  ngOnInit() {
    this.locations = Constants.locations;
    this.kittyService.getFlights()
      .subscribe(
        subscr => {
          this.flight = subscr;
          console.log(subscr);
        },
        err => console.log(err));
  }

}
