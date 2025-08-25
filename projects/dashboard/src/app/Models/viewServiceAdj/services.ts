import { accOrdec_service } from './accOrdec_service';

export class services {
  'id': number;
  'service_provider_id': number;
  'service_id': number;
  'availability_status_id': number;
  'description': string;
  'created_at': string;
  'updated_at': string;
  'service_provider': accOrdec_service;
}
