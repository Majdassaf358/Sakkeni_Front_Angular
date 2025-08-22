import { commercial } from '../property-types/commercial';
import { residential } from '../property-types/residential';
import { off_plan } from '../sale-types/off_plan';
import { purchase } from '../sale-types/purchase';
import { rent } from '../sale-types/rent';
import { availability_status } from '../sub_classes/availability_status';
import { cover_image } from './cover_image';
import { location } from './location';
import { owner } from './owner';

export class pendingReq {
  'id': number;
  'location_id': number;
  'property_type_id': number;
  'owner_id': number;
  'availability_status_id': availability_status;
  'cover_image': cover_image;
  'owner': owner;
  'property_type': number;
  'location': location;
  'residential': residential;
  'commercial': commercial;
  'off_plan': off_plan;
  'rent': rent;
  'purchase': purchase;
}
