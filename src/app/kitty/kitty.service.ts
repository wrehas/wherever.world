import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import { Observable, ReplaySubject, Subject } from "rxjs";
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

@Injectable()

export class KittyService {
  apiEndpoint: string = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/uk/eur/en-US/LON/anywhere/2017-06-20?apikey=prtl6749387986743898559646983194';
  constructor(private http: Http) { 

    
  }

  getFlights() {
    return this.http.get(this.apiEndpoint)
    
      .map(response => response.json())
      .flatMap(obj =>
      {
        let places = [];
        Observable.of(...obj.Places)
          .map(place => {
            return {placeId: place.PlaceId, name: place.Name};
          })
          .toArray()
          .subscribe(x => places = x);
          
        return Observable.of(...obj.Quotes)
          .map(quote => {
            return {
              quote: quote, 
              place: places.find(place => place.placeId == quote.OutboundLeg.DestinationId)
            };
          });
      })
      .reduce((acc, quoteObj) => {
        return acc.quote.MinPrice == null 
          ? quoteObj 
          : ((quoteObj.quote.MinPrice < acc.quote.MinPrice) ? quoteObj : acc);
      }, 
      {quote: {MinPrice: null}, place: null});
      
}

}
