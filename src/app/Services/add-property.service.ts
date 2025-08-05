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
import { residential } from '../Models/property-types/residential';
import { commercial } from '../Models/property-types/commercial';

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
              bedrooms: [''],
              building_number: [''],
              apartment_number: [''],
            }),
            villa: this.fb.group({
              bedrooms: [''],
              floors: [null],
            }),
          }),
          commercial: this.fb.group({
            commercial_property_type_id: [],
            office: this.fb.group({
              floor: [''],
              building_number: [''],
              apartment_number: [''],
            }),
          }),
          rent: this.fb.group({
            price: [null, [Validators.required, Validators.min(0)]],
            lease_period_value: [''],
            lease_period_unit: [''],
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
    const images = this.form.get('stepOne.images')!.value;

    const formData = new FormData();
    images.forEach((image: File) => {
      formData.append('images[]', image);
    });
    formData.append('country_id', basic.country_id);
    formData.append('city_id', basic.city_id);
    formData.append('latitude', basic.latitude);
    formData.append('longitude', basic.longitude);
    formData.append('additional_info', basic.additional_info);

    formData.append('area', basic.area);
    formData.append('bathrooms', basic.bathrooms);
    formData.append('balconies', basic.balconies);
    formData.append('bedrooms', basic.bedrooms ?? 2);
    formData.append(
      'residential_property_type_id',
      basic.residential_property_type_id ?? 2
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
    if (basic.sellType == 1) {
      console.log('rent id 1');
      formData.append('price', extended.rent.price);
      formData.append('lease_period_value', extended.rent.lease_period_value);
      formData.append('lease_period_unit', extended.rent.lease_period_unit);
      formData.append('is_furnished', extended.rent.is_furnished);
    }
    if (basic.sellType == 2) {
      console.log('purchase id 2');
      formData.append('price', extended.purchase.price);
      formData.append('is_furnished', extended.purchase.is_furnished);
    }
    if (basic.sellType == 3) {
      console.log('offPlan id 3');
    }
    let url = `${environment.Api}/add-property`;
    return this.http.post<ApiResponse<null>>(url, formData);
  }
}
