import { Injectable } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiResponse } from '../Models/ApiResponse';
import { Observable } from 'rxjs';
import { environment } from '../shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddPropertyService {
  private form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      stepOne: this.fb.group({
        images: this.fb.array([], Validators.required),
      }),
      stepTwo: this.fb.group({
        basic: this.fb.group({
          country_id: ['', Validators.required],
          city_id: ['', Validators.required],
          latitude: [1, Validators.required],
          longitude: [1, Validators.required],
          additional_info: ['', Validators.required],
          exposures: this.fb.array([], Validators.required),
          area: ['', [Validators.required, Validators.min(1)]],
          bathrooms: ['', [Validators.required, Validators.min(0)]],
          balconies: ['', [Validators.required, Validators.min(0)]],
          ownership_type_id: this.fb.array([], Validators.required),
          amenities: this.fb.array([], Validators.required),
          sellType: [1, Validators.required],
          propertyType: [1, Validators.required],
        }),
        extended: this.fb.group({
          residential: this.fb.group({
            residential_property_type_id: [''],
            apartment: this.fb.group({
              bedrooms: [0],
              floor: [0],
              building_number: [0],
              apartment_number: [0],
            }),
            villa: this.fb.group({
              bedrooms: [0],
              floors: [0],
            }),
          }),
          commercial: this.fb.group({
            commercial_property_type_id: [''],
            office: this.fb.group({
              floor: [0],
              building_number: [0],
              apartment_number: [0],
            }),
          }),
          rent: this.fb.group({
            price: [null, [Validators.required, Validators.min(0)]],
            lease_period_value: [0],
            lease_period_unit: [0],
            is_furnished: [0],
          }),
          purchase: this.fb.group({
            price: [null, [Validators.required, Validators.min(0)]],
            is_furnished: [0],
          }),
          offPlan: this.fb.group({
            delivery_date: [null],
            overall_payment: [null],
            payment_phases: this.fb.array([]),
          }),
        }),
      }),
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  get images(): FormArray {
    return this.form.get('stepOne.images') as FormArray;
  }

  addImage(url: string): void {
    const imagesArray = this.form.get('stepOne.images') as FormArray;
    imagesArray.push(new FormControl(url));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  resetForm(): void {
    this.form = this.createForm();
  }
  public addProperty(): Observable<ApiResponse<null>> {
    const basic = this.form.get('stepTwo.basic')!.value;
    const extended = this.form.get('stepTwo.extended')!.value;
    const filesArray = this.form.get('stepOne.images')!.value as File[];

    const formData = new FormData();
    filesArray.forEach((file: File) => {
      formData.append('images[]', file);
    });
    formData.append('country_id', basic.country_id);
    formData.append('city_id', basic.city_id);
    formData.append('latitude', basic.latitude);
    formData.append('longitude', basic.longitude);
    formData.append('additional_info', basic.additional_info);

    formData.append('area', basic.area);
    formData.append('bathrooms', basic.bathrooms);
    formData.append('balconies', basic.balconies);
    formData.append(
      'residential_property_type_id',
      extended.residential.residential_property_type_id
    );

    formData.append('sell_type_id', basic.sellType);
    formData.append('property_type_id', basic.propertyType);

    basic.exposures.forEach((item: any) => {
      formData.append('exposure[]', item);
    });

    basic.ownership_type_id.forEach((id: any) => {
      formData.append('ownership_type_id', id);
    });

    basic.amenities.forEach((id: any) => {
      formData.append('amenities[]', id);
    });
    if (basic.sellType == 2) {
      console.log('rent id 2');
      formData.append('price', extended.rent.price);
      formData.append('lease_period_value', extended.rent.lease_period_value);
      formData.append('lease_period_unit', extended.rent.lease_period_unit);
      formData.append('is_furnished', extended.rent.is_furnished);
    }
    if (basic.sellType == 1) {
      console.log('purchase id 1');
      formData.append('price', extended.purchase.price);
      formData.append('is_furnished', extended.purchase.is_furnished);
    }
    if (basic.sellType == 3) {
      console.log('offPlan id 3');
    }
    if (extended.residential.residential_property_type_id === 1) {
      console.log('apa');
      formData.append('bedrooms', extended.residential.apartment.bedrooms);
      formData.append('floor', extended.residential.apartment.floor);
      formData.append(
        'building_number',
        extended.residential.apartment.building_number
      );
      formData.append(
        'apartment_number',
        extended.residential.apartment.apartment_number
      );
    } else if (extended.residential.residential_property_type_id === 2) {
      console.log('villa');

      formData.append('bedrooms', extended.residential.villa.bedrooms);
      formData.append('floors', extended.residential.villa.floors);
    } else {
      console.log('office');

      formData.append('floor', extended.commercial.office.floor);
      formData.append(
        'building_number',
        extended.commercial.office.building_number
      );
      formData.append(
        'apartment_number',
        extended.commercial.office.apartment_number
      );
    }

    let url = `${environment.Api}/add-property`;
    return this.http.post<ApiResponse<null>>(url, formData);
  }
}
