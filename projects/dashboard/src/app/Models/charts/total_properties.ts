import { commercial } from './commercial';
import { residential } from './residental';

export class total_properties {
  'total': number;
  'off-plan': number;
  'purchase': number;
  'rent': number;
  'commercial': commercial;
  'residential': residential;
}
