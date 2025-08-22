import { city } from '../sub_classes/city';
import { country } from '../sub_classes/country';

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
