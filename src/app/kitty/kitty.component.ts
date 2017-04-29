import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import
import { KittyService } from './kitty.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-kitty',
  templateUrl: './kitty.component.html',
  styleUrls: ['./kitty.component.css']
})
export class KittyComponent implements OnInit {

  quotes: any[];
  places: any[];


  constructor(private kittyService:KittyService) { }

  ngOnInit() {
    this.kittyService.getFlights()
      .subscribe(
        subscr => console.log(subscr), 
        err => console.log(err));
  }

}
