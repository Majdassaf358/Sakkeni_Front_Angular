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

@Injectable({
  providedIn: 'root',
})
export class AddPropertyService {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      images: this.fb.array([], Validators.required),
      country: [null, Validators.required],
      city: [null, Validators.required],
      location: [null, Validators.required],
      exposure: [<number[]>[], Validators.required],
      area: [null, [Validators.required, Validators.min(1)]],
      bathrooms: [null, [Validators.required, Validators.min(0)]],
      sellType: ['rent', Validators.required],
      propertyType: ['apartment', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      floorNumber: [null],
      leasePeriod: [''],
      buildingNumber: [''],
      paymentPlan: [''],
      apartmentNumber: [''],
      furnishing: [''],
    });
  }
  getForm(): FormGroup {
    return this.form;
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  addImage(url: string): void {
    const imagesArray = this.form.get('images') as FormArray;
    imagesArray.push(new FormControl(url));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  resetForm(): void {
    this.form = this.createForm();
  }
}
