import { user } from '../sub_classes/user';
import { reason } from './reason';
import { reportable_service } from './reportable_service';

export class service_report {
  'id': number;
  'user_id': number;
  'reportable_type': string;
  'reportable_id': number;
  'report_reason_id': number;
  'additional_comments': string;
  'status': 'pending';
  'admin_id': number;
  'admin_notes': null;
  'created_at': string;
  'updated_at': string;
  'user': user;
  'reason': reason;
  'reportable': reportable_service;
}
