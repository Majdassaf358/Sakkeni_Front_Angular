import { view_admins } from '../viewAdmin/view_admins';
import { services } from './services';

export class approve_or_decline_service {
  'id': number;
  'service_id': number;
  'admin_id': number;
  'approve': number;
  'reason': null;
  'created_at': string;
  'updated_at': string;
  'services': services;
  'admin': view_admins;
}
