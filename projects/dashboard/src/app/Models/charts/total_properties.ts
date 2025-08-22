import { commercial_chart } from './commercial_chart';
import { residential_chart } from './residential_chart';

export class total_properties {
  'total': number;
  'off-plan': number;
  'purchase': number;
  'rent': number;
  'commercial': commercial_chart;
  'residential': residential_chart;
}
