import { Injectable } from '@angular/core';
import { amenities } from '../Models/amenities';
import { commercial } from '../Models/property-types/commercial';
import { residential } from '../Models/property-types/residential';
import { rent } from '../Models/sale-types/rent';
import { purchase } from '../Models/sale-types/purchase';
import { off_plan } from '../Models/sale-types/off_plan';

export interface BaseProperty {
  country_id?: number;
  city_id?: number;
  altitude?: number;
  longitude?: number;
  additional_info?: string;
  exposure?: [];
  area?: number;
  bathrooms?: number;
  balconies?: number;
  ownership_type_id?: number;
  amenities?: amenities[];
  images?: [];
  // commercial: commercial;
  // residential: residential;
  // rent: rent;
  // purchase: purchase;
  // off_plan: off_plan;
}
export interface CommercialProperty {
  floor: number;
  building_number: number;
  apartment_number: number;
  commercial_property_type_id: number;
}

export interface ResidentialProperty {
  bedrooms: number;
  residential_property_type_id: number;
}

export interface RentTransaction {
  price: number;
  lease_period_value: number;
  lease_period_unit: string;
  is_furnished: number;
}

export interface PurchaseTransaction {
  price: number;
  is_furnished: number;
}

export interface OffPlanTransaction {
  delivery_date: string;
  first_pay: number;
  pay_plan: string;
  overall_payment: number;
}
export type PropertyForm = (
  | (BaseProperty & CommercialProperty)
  | (BaseProperty & ResidentialProperty)
) &
  (RentTransaction | PurchaseTransaction | OffPlanTransaction);

@Injectable({
  providedIn: 'root',
})
export class AddPropertyService {
  private formData: Partial<PropertyForm> = {};

  setFormData(data: Partial<PropertyForm>): void {
    this.formData = { ...this.formData, ...data };
  }

  getFormData(): Partial<PropertyForm> {
    return { ...this.formData };
  }

  resetForm(): void {
    this.formData = {};
  }
}
