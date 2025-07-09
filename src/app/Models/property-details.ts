import { amenities } from './amenities';
import { directions } from './directions';
import { availability_status } from './home-details-info/availability_status';
import { ownership_type } from './home-details-info/ownership_type';
import { property_type } from './home-details-info/property_type';
import { cover_image } from './images';
import { location } from './location';
import { profile } from './profile/profile';
import { commercial } from './property-types/commercial';
import { residential } from './property-types/residential';
import { off_plan } from './sale-types/off_plan';
import { purchase } from './sale-types/purchase';
import { rent } from './sale-types/rent';

export class propertyDetails {
  'id': number;
  'admin_id': number;
  'area': number;
  'bathrooms': number;
  'balconies': number;
  'amenities': amenities[];
  'directions': directions[];
  'images': cover_image[];
  'property_type': property_type;
  'availability_status': availability_status;
  'ownership_type': ownership_type;
  'owner': profile;
  'location': location;
  'residential': residential;
  'commercial': commercial;
  'rent': rent;
  'purchase': purchase;
  'off_plan': off_plan;
}
