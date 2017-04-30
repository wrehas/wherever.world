import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import
import { KittyService } from './kitty.service';
import 'rxjs/add/operator/map';
import { Constants } from "../constants";

declare var google: any;
// declare var map: any;
 declare var MarkerClusterer;


@Component({
  selector: 'app-kitty',
  templateUrl: './kitty.component.html',
  styleUrls: ['./kitty.component.css']
})
export class KittyComponent implements OnInit {

  public flights : any[] = [];
  private coordinates: any[] = [];
  private gMapApiKey: string = 'AIzaSyBoGIkzOAHulF1qinLaP-lk1nSfflxiNGg';



  constructor(private kittyService: KittyService) { }

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
            this.coordinates.push({lat: parseFloat(coords[0]), lng: parseFloat(coords[1])});

            console.log(coords);
            console.log(flight);
          },
          err => console.log(err),
          () => {
            this.gmapInint();
          }
        );
      })
    

    // var mapProp = {
    //   center: new google.maps.LatLng(51.508742, -0.120850),
    //   zoom: 5,
    //   // mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // var map = new google.maps.Map(document.getElementById("gmap"), mapProp);

    
    // Create a map object, and include the MapTypeId to add
        // to the map type control.
//     var map = new google.maps.Map(document.getElementById('gmap'),


//       {
//           center: {lat: 55.647, lng: 37.581},
//           zoom: 11,
//           mapTypeControlOptions: {
//             mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
//                     'styled_map']
//           }
//         });

//         //Associate the styled map with the MapTypeId and set it to display.
//         map.mapTypes.set('styled_map', styledMapType);
//         map.setMapTypeId('styled_map');
      

// // Create a new StyledMapType object, passing it an array of styles,
//         // and the name to be displayed on the map type control.
//         var styledMapType = new google.maps.StyledMapType(
//             [
//               {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
//               {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
//               {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
//               {
//                 featureType: 'administrative',
//                 elementType: 'geometry.stroke',
//                 stylers: [{color: '#c9b2a6'}]
//               },
//               {
//                 featureType: 'administrative.land_parcel',
//                 elementType: 'geometry.stroke',
//                 stylers: [{color: '#dcd2be'}]
//               },
//               {
//                 featureType: 'administrative.land_parcel',
//                 elementType: 'labels.text.fill',
//                 stylers: [{color: '#ae9e90'}]
//               },
//               {
//                 featureType: 'landscape.natural',
//                 elementType: 'geometry',
//                 stylers: [{color: '#dfd2ae'}]
//               },
//               {
//                 featureType: 'poi',
//                 elementType: 'geometry',
//                 stylers: [{color: '#dfd2ae'}]
//               },
//               {
//                 featureType: 'poi',
//                 elementType: 'labels.text.fill',
//                 stylers: [{color: '#93817c'}]
//               },
//               {
//                 featureType: 'poi.park',
//                 elementType: 'geometry.fill',
//                 stylers: [{color: '#a5b076'}]
//               },
//               {
//                 featureType: 'poi.park',
//                 elementType: 'labels.text.fill',
//                 stylers: [{color: '#447530'}]
//               },
//               {
//                 featureType: 'road',
//                 elementType: 'geometry',
//                 stylers: [{color: '#f5f1e6'}]
//               },
//               {
//                 featureType: 'road.arterial',
//                 elementType: 'geometry',
//                 stylers: [{color: '#fdfcf8'}]
//               },
//               {
//                 featureType: 'road.highway',
//                 elementType: 'geometry',
//                 stylers: [{color: '#f8c967'}]
//               },
//               {
//                 featureType: 'road.highway',
//                 elementType: 'geometry.stroke',
//                 stylers: [{color: '#e9bc62'}]
//               },
//               {
//                 featureType: 'road.highway.controlled_access',
//                 elementType: 'geometry',
//                 stylers: [{color: '#e98d58'}]
//               },
//               {
//                 featureType: 'road.highway.controlled_access',
//                 elementType: 'geometry.stroke',
//                 stylers: [{color: '#db8555'}]
//               },
//               {
//                 featureType: 'road.local',
//                 elementType: 'labels.text.fill',
//                 stylers: [{color: '#806b63'}]
//               },
//               {
//                 featureType: 'transit.line',
//                 elementType: 'geometry',
//                 stylers: [{color: '#dfd2ae'}]
//               },
//               {
//                 featureType: 'transit.line',
//                 elementType: 'labels.text.fill',
//                 stylers: [{color: '#8f7d77'}]
//               },
//               {
//                 featureType: 'transit.line',
//                 elementType: 'labels.text.stroke',
//                 stylers: [{color: '#ebe3cd'}]
//               },
//               {
//                 featureType: 'transit.station',
//                 elementType: 'geometry',
//                 stylers: [{color: '#dfd2ae'}]
//               },
//               {
//                 featureType: 'water',
//                 elementType: 'geometry.fill',
//                 stylers: [{color: '#b9d3c2'}]
//               },
//               {
//                 featureType: 'water',
//                 elementType: 'labels.text.fill',
//                 stylers: [{color: '#92998d'}]
//               }
//             ],
//             {name: 'Styled Map'});  




        
   
  }
  

  gmapInint() {
          
    var map = new google.maps.Map(document.getElementById('gmap'), {
          zoom: 3,
          center: {lat: -28.024, lng: 140.887}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
  var gLocations = [
        {lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187},
        {lat: -37.774785, lng: 145.137978},
        {lat: -37.819616, lng: 144.968119},
        {lat: -38.330766, lng: 144.695692},
        {lat: -39.927193, lng: 175.053218},
        {lat: -41.330162, lng: 174.865694},
        {lat: -42.734358, lng: 147.439506},
        {lat: -42.734358, lng: 147.501315},
        {lat: -42.735258, lng: 147.438000},
        {lat: -43.999792, lng: 170.463352}
      ]    
        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = this.coordinates.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(
          map,
          markers,
          { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
        );
      
    
        }

        

    
    
   
}  
