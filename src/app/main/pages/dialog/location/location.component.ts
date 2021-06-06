import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressModel} from "../../../../../models/address.model";


export class LocationModel {
  latitude: string;
  longitude: string;
  locationText: string;
}


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
  data: AddressModel;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public location: string;
  public address: string;
  locationLngLat = new LocationModel();
  // @ts-ignore
    @ViewChild('search')
  public searchElementRef: ElementRef;
  private geoCoder;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              public dialog: MatDialog,
              public matDialogRef: MatDialogRef<LocationComponent>,
  ) {
    this.matDialogRef.disableClose = true;
  }


  ngOnInit() {

      this.mapsAPILoader.load().then(() => {

          this.setCurrentLocation();

        // tslint:disable-next-line:new-parens
          this.geoCoder = new google.maps.Geocoder;
          var InputOptions = {
              componentRestrictions: { country: 'AE' } // I want multiple counteries here**
          };
          const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement , InputOptions);
          autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.getAddress(this.latitude, this.longitude);
            this.zoom = 12;
          });
        });
      });

  }

  selectLocation() {
    this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(this.locationLngLat));
    this.matDialogRef.close();
  }


  getAddress(latitude, longitude) {
    this.locationLngLat.longitude = longitude.toString();
    this.locationLngLat.latitude = latitude.toString();

    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.locationLngLat.locationText = this.address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  markerDragEnd($event) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        if (this.data) {
          this.latitude = +(this.data.lat);
          this.longitude = +(this.data.lng);
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        }else{
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        }

      });
    }}

}
