import { city } from './city';
import { country } from './country';

export class location {
  'id': number;
  'country_id': number;
  'city_id': number;
  'latitude': number;
  'longitude': number;
  'additional_info': string;
  'updated_at': string;
  'city': city;
  'country': country;
}
