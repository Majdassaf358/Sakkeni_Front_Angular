import { images } from './images';

export class propertyCard {
  'id': number;
  'price': number;
  'country': string;
  'city': string;
  'additional_info': string;
  'images': images[];
}
