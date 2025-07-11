import { Injectable } from '@angular/core';
import { amenities } from '../Models/amenities';
import { commercial } from '../Models/property-types/commercial';
import { residential } from '../Models/property-types/residential';
import { rent } from '../Models/sale-types/rent';
import { purchase } from '../Models/sale-types/purchase';
import { off_plan } from '../Models/sale-types/off_plan';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddPropertyService {
  private wizardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.wizardForm = this.fb.group({
      // Step 1: images array
      images: this.fb.array([]),
      // You can add other steps here:
      // stepTwoData: this.fb.group({ ... }),
      // stepThreeData: this.fb.group({ ... })
    });
  }

  getForm(): FormGroup {
    return this.wizardForm;
  }

  get images(): FormArray {
    return this.wizardForm.get('images') as FormArray;
  }

  addImage(imageData: string): void {
    this.images.push(this.fb.control(imageData));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  clearImages(): void {
    while (this.images.length) {
      this.images.removeAt(0);
    }
  }
}
