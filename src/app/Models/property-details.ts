import { amenities } from './amenities';
import { directions } from './directions';
import { cover_image } from './images';

export class propertyDetails {
  'id': number;
  'location_id': number;
  'owner_id': number;
  'admin_id': number;
  'area': number;
  'bathrooms': number;
  'balconies': number;
  'ownership_type_id': number;
  'property_type_id': number;
  'sell_type_id': number;
  'availability_status_id': number;
  'created_at': string;
  'updated_at': string;
  'country_id': number;
  'city_id': number;
  'latitude': number;
  'longitude': number;
  'additional_info': string;
  'name': string;
  'property_id': number;
  'price': number;
  'lease_period': string;
  'payment_plan': string;
  'is_furnished': number;
  'floor': number;
  'building_number': number;
  'apartment_number': number;
  'commercial_property_type_id': number;
  'images': cover_image[];
  'amenities': amenities[];
  'directions': directions[];
}
