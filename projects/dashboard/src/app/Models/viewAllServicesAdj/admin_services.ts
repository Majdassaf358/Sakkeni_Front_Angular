import { view_admins } from '../viewAdmin/view_admins';

export class admin_services {
  'id': number;
  'service_id': number;
  'admin_id': number;
  'approve': number;
  'reason': null;
  'created_at': string;
  'updated_at': string;
  'admin': view_admins;
}
