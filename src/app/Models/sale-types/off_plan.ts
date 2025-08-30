import { payment_phases } from '../off_plan/payment_phases';

export class off_plan {
  'id': number;
  'property_id': number;
  'delivery_date': string;
  'overall_payment': number;
  'payment_phases': payment_phases[];
}
