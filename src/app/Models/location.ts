import { city } from './home-details-info/city';
import { country } from './home-details-info/country';

export class location {
  'id': number;
  'country_id': number;
  'city_id': number;
  'latitude': number;
  'longitude': number;
  'additional_info': string;
  'country': country;
  'city': city;
}
