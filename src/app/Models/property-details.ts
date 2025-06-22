import { amenities } from './amenities';
import { directions } from './directions';
import { availability_status } from './home-details-info/availability_status';
import { ownership_type } from './home-details-info/ownership_type';
import { property_type } from './home-details-info/property_type';
import { cover_image } from './images';
import { location } from './location';
import { profile } from './profile';

export class propertyDetails {
  'id': number;
  'location_id': number;
  'owner_id': number;
  'admin_id': number;
  'area': number;
  'bathrooms': number;
  'balconies': number;
  'ownership_type_id': number;
  'sell_type_id': number;
  'amenities': amenities[];
  'directions': directions[];
  'images': cover_image[];
  'property_type': property_type;
  'availability_status': availability_status;
  'ownership_type': ownership_type;
  'owner': profile;
  'location': location;
  // Rent
}
