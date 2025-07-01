import { residential_property_type } from './residential_property_type';

export class residential {
  'id': number;
  'property_id': number;
  'bedrooms': number;
  'residential_property_type_id': number;
  'residential_property_type': residential_property_type;
}
