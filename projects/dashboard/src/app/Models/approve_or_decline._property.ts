import { view_admins } from './viewAdmin/view_admins';
import { pendingReq } from './viewPending/pendingReq';

export class approve_or_decline_property {
  'id': number;
  'property_id': number;
  'admin_id': number;
  'approve': number;
  'reason': null;
  'created_at': string;
  'updated_at': string;
  'property': pendingReq;
  'admin': view_admins;
}
