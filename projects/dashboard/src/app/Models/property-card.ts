import { commercial } from './property-types/commercial';
import { residential } from './property-types/residential';
import { off_plan } from './sale-types/off_plan';
import { purchase } from './sale-types/purchase';
import { rent } from './sale-types/rent';
import { availability_status } from './sub_classes/availability_status';
import { property_type } from './sub_classes/property_type';
import { cover_image } from './viewPending/cover_image';
import { location } from './viewPending/location';
import { owner } from './viewPending/owner';

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
