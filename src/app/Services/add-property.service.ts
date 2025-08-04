import { Injectable } from '@angular/core';
import { amenities } from '../Models/amenities';
import { commercial } from '../Models/property-types/commercial';
import { residential } from '../Models/property-types/residential';
import { rent } from '../Models/sale-types/rent';
import { purchase } from '../Models/sale-types/purchase';
import { off_plan } from '../Models/sale-types/off_plan';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { addProperty } from '../Models/addProperty';
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
          apartment: this.fb.group({
            building_number: [''],
            apartment_number: [''],
          }),
          villa: this.fb.group({
            floors: [null],
          }),
          office: this.fb.group({
            building_number: [''],
            apartment_number: [''],
          }),
          rent: this.fb.group({
            price: [null, [Validators.required, Validators.min(0)]],
            lease_period_value: [''],
            lease_period_unit: [''],
            is_furnished: [false],
          }),
          purchase: this.fb.group({
            price: [null, [Validators.required, Validators.min(0)]],
            is_furnished: [false],
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
  public addProperty(property: addProperty): Observable<ApiResponse<null>> {
    var req: addProperty = this.form.getRawValue();
    let url = `${environment.Api}/add-property`;
    return this.http.post<ApiResponse<null>>(url, property);
  }
}
