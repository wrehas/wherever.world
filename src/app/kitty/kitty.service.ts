import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { Constants } from '../constants';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';

@Injectable()

export class KittyService {
  apiEndpoint: string = "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/uk/eur/en-US/LON/anywhere/";
  apiKey: string = "?apikey=cm415982973361248809763878995413";
  constructor(private http: Http) { 

    
  }

  private static OVERPRICED : number = 75;
  private static PROBABILITY_MAP : any = { "11": 3900, "12": 7635, "13": 11223, "14": 14681, "15": 18022, "16": 21256, "17": 24394, "18": 27443, "19": 30412, "20": 33305, "21": 36128, "22": 38886, "23": 41584, "24": 44225, "25": 46812, "26": 49350, "27": 51839, "28": 54284, "29": 56687, "30": 59049, "31": 61373, "32": 63660, "33": 65912, "34": 68131, "35": 70318, "36": 72474, "37": 74601, "38": 76700, "39": 78771, "40": 80817, "41": 82837, "42": 84834, "43": 86807, "44": 88757, "45": 90686, "46": 92593, "47": 94481, "48": 96348, "49": 98196, "50": 98222, "51": 98247, "52": 98272, "53": 98297, "54": 98321, "55": 98344, "56": 98367, "57": 98390, "58": 98412, "59": 98434, "60": 98456, "61": 98477, "62": 98498, "63": 98518, "64": 98539, "65": 98559, "66": 98578, "67": 98597, "68": 98616, "69": 98635, "70": 98654, "71": 98672, "72": 98690, "73": 98708, "74": 98725, "75": 98742, "76": 98759, "77": 98776, "78": 98793, "79": 98809, "80": 98825, "81": 98841, "82": 98857, "83": 98873, "84": 98888, "85": 98903, "86": 98918, "87": 98933, "88": 98948, "89": 98962, "90": 98977, "91": 98991, "92": 99005, "93": 99019, "94": 99033, "95": 99046, "96": 99060, "97": 99073, "98": 99086, "99": 99099, "100": 99112, "101": 99125, "102": 99138, "103": 99150, "104": 99163, "105": 99175, "106": 99187, "107": 99200, "108": 99212, "109": 99223, "110": 99235, "111": 99247, "112": 99258, "113": 99270, "114": 99281, "115": 99292, "116": 99304, "117": 99315, "118": 99326, "119": 99336, "120": 99347, "121": 99358, "122": 99369, "123": 99379, "124": 99389, "125": 99400, "126": 99410, "127": 99420, "128": 99430, "129": 99440, "130": 99450, "131": 99460, "132": 99470, "133": 99480, "134": 99489, "135": 99499, "136": 99509, "137": 99518, "138": 99527, "139": 99537, "140": 99546, "141": 99555, "142": 99564, "143": 99573, "144": 99582, "145": 99591, "146": 99600, "147": 99609, "148": 99618, "149": 99626, "150": 99635, "151": 99643, "152": 99652, "153": 99660, "154": 99669, "155": 99677, "156": 99685, "157": 99694, "158": 99702, "159": 99710, "160": 99718, "161": 99726, "162": 99734, "163": 99742, "164": 99750, "165": 99758, "166": 99766, "167": 99773, "168": 99781, "169": 99789, "170": 99796, "171": 99804, "172": 99811, "173": 99819, "174": 99826, "175": 99834, "176": 99841, "177": 99848, "178": 99856, "179": 99863, "180": 99870, "181": 99877, "182": 99884, "183": 99891, "184": 99898, "185": 99905, "186": 99912, "187": 99919, "188": 99926, "189": 99933, "190": 99940, "191": 99947, "192": 99953, "193": 99960, "194": 99967, "195": 99973, "196": 99980, "197": 99986, "198": 99993, "199": 100000 };

  getFlight(dateForward: string, dateBack: string) {
    let rand : number = Math.random() * 100000; 
    return this.http.get(this.apiEndpoint + dateForward + (dateBack != null ? "/" + dateBack : "") + this.apiKey)
      .map(response => response.json())
      .flatMap(obj =>
      {
        let places = [];
        Observable.of(...obj.Places)
          .map(place => {
            return {placeId: place.PlaceId, name: place.Name, code: place.IataCode};
          })
          .toArray()
          .subscribe(x => places = x);
          
        return Observable.of(...obj.Quotes)
          .filter(quote => quote.MinPrice < KittyService.OVERPRICED)
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
          : ((quoteObj.quote.MinPrice < acc.quote.MinPrice) ? quoteObj : acc); //(Math.random() > 0.5 ? quoteObj : acc);
      }, 
      {quote: {MinPrice: null}, place: null});
  }

  private getChanceForQuote(price : number) : number {
    if(price < KittyService.OVERPRICED) {
      return KittyService.PROBABILITY_MAP[price];
    }
    else {
      return null;
    }
  }

  

}
