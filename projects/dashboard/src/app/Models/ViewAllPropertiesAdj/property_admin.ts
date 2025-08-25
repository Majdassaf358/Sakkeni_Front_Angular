import { view_admins } from '../viewAdmin/view_admins';

export class property_admin {
  'id': number;
  'property_id': number;
  'admin_id': number;
  'approve': number;
  'reason': string;
  'created_at': string;
  'updated_at': string;
  'admin': view_admins;
}
