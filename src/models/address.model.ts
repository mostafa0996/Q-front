import {CityModel} from './city.model';

export interface AddressModel {
  city: string;
  _id?: string;
  area: string;
  type: string;
  apartment: string;
  street: string;
  building: string;
  phone: string;
  floor: string;
  lng: string;
  lat: string;
  cityObj: CityModel;
  location_text: string;
  name: string;
}


