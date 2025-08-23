import { service_provider_pending_services } from './service_provider_pending_services';

export class service_provider {
  'id': number;
  'user_id': number;
  'rate': number;
  'description': string;
  'created_at': string;
  'updated_at': string;
  'service_provider_pending_services': service_provider_pending_services[];
}
