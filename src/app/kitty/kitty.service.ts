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
//     let headers = new Headers({ 'Content-Type': 'application/json' });
// headers.append('Access-Control-Allow-Headers', 'Content-Type');
// headers.append('Access-Control-Allow-Methods', 'GET');
// headers.append('Access-Control-Allow-Origin', '*');  
// let options = new RequestOptions({ headers: headers });    
//     return this.http.get(this.apiEndpoint, options)
    return this.http.get(this.apiEndpoint)
    
      .map(response => response.json())
      .map(obj =>
      {
      let quotes =  Observable.of(...obj.Quotes)
        .reduce((acc, quote) => acc.MinPrice == null ? quote : ((quote.MinPrice < acc.MinPrice) ? quote : acc), {MinPrice: null})
      }  
        
        
      )
     // .do(res=>console.log('how many it was before:', res.Quotes))
      .flatMap(json => Observable.of(...json.Quotes))
      .reduce((acc, quote) => acc.MinPrice == null ? quote : ((quote.MinPrice < acc.MinPrice) ? quote : acc), {MinPrice: null})
      
}

}
