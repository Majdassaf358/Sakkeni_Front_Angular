import { availability_status } from '../sub_classes/availability_status';
import { admin_services } from './admin_services';
import { service_provider_all } from './service_provider_all';

export class all_services {
  'id': number;
  'service_provider_id': number;
  'service_id': number;
  'availability_status_id': number;
  'description': string;
  'created_at': '2025-08-26T05:58:40.000000Z';
  'updated_at': '2025-08-26T05:58:40.000000Z';
  'admin_services': admin_services;
  'availability_status': availability_status;
  'service_provider': service_provider_all;
}
