import { commercial_property_type } from './commercial_property_type';

export class commercial {
  'id': number;
  'property_id': number;
  'floor': number;
  'building_number': number;
  'apartment_number': number;
  'commercial_property_type_id': number;
  'commercial_property_type': commercial_property_type;
}
