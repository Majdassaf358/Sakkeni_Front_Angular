import { availability_status } from '../sub_classes/availability_status';
import { location } from '../sub_classes/location';
import { owner } from '../viewPending/owner';
import { property_admin } from './property_admin';

export class allproperties {
  'id': number;
  'location_id': number;
  'owner_id': number;
  'admin_id': number;
  'area': number;
  'bathrooms': number;
  'balconies': number;
  'users_clicks': number;
  'ownership_type_id': number;
  'property_type_id': number;
  'sell_type_id': number;
  'availability_status_id': number;
  'description': null;
  'created_at': string;
  'updated_at': string;
  'owner': owner;
  'property_admin': property_admin;
  'availability_status': availability_status;
  'location': location;
}
