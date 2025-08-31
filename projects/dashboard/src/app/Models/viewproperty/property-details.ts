import { commercial } from '../property-types/commercial';
import { residential } from '../property-types/residential';
import { off_plan } from '../sale-types/off_plan';
import { purchase } from '../sale-types/purchase';
import { rent } from '../sale-types/rent';
import { availability_status } from '../sub_classes/availability_status';
import { owner } from '../sub_classes/owner';
import { ownership_type } from '../sub_classes/ownership_type';
import { property_type } from '../sub_classes/property_type';
import { cover_image } from '../viewPending/cover_image';
import { location } from '../viewPending/location';
import { amenities } from './amenities';
import { directions } from './directions';

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
  'owner': owner;
  'admin': owner;
  'location': location;
  'residential': residential;
  'commercial': commercial;
  'rent': rent;
  'purchase': purchase;
  'off_plan': off_plan;
}
