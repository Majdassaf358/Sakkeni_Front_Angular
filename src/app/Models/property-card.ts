import { availability_status } from './home-details-info/availability_status';
import { owner } from './home-details-info/owner';
import { property_type } from './home-details-info/property_type';
import { cover_image } from './images';
import { location } from './location';
import { commercial } from './property-types/commercial';
import { residential } from './property-types/residential';
import { off_plan } from './sale-types/off_plan';
import { purchase } from './sale-types/purchase';
import { rent } from './sale-types/rent';

export class propertyCard {
  'id': number;
  'cover_image': cover_image;
  'availability_status': availability_status;
  'owner': owner;
  'property_type': property_type;
  'location': location;
  'residential': residential;
  'commercial': commercial;
  'rent': rent;
  'purchase': purchase;
  'off_plan': off_plan;
}
