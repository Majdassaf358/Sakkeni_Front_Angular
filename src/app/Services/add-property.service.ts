import { Injectable } from '@angular/core';
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
    this.setupConditionalValidators(); // 🔧 setup dynamic rules
  }

  private createForm(): FormGroup {
    return this.fb.group({
      stepOne: this.fb.group({
        images: this.fb.array([], Validators.required),
      }),
      stepTwo: this.fb.group({
        basic: this.fb.group({
          country: [null, Validators.required],
          city: [null, Validators.required],
          location: ['123 Main St, Damascus', Validators.required],
          exposures: this.fb.array([], Validators.required),
          area: [null, [Validators.required, Validators.min(1)]],
          bathrooms: [null, [Validators.required, Validators.min(0)]],
          balconies: [null, [Validators.required, Validators.min(0)]],
          ownership_type_id: this.fb.array([], Validators.required),
          amenities: this.fb.array([], Validators.required),
          sellType: ['rent', Validators.required],
          propertyType: ['apartment', Validators.required],
        }),
        extended: this.fb.group({
          apartment: this.fb.group({
            building_number: [''],
            apartment_number: [''],
            floor: [null],
          }),
          villa: this.fb.group({
            floors: [null],
          }),
          office: this.fb.group({
            building_number: [''],
            apartment_number: [''],
            floor: [null],
          }),
          rent: this.fb.group({
            price: [null],
            leasePeriod: [''],
            lease_period_unit: [''],
            is_furnished: [false],
          }),
          purchase: this.fb.group({
            price: [null],
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

  private setupConditionalValidators(): void {
    const basicGroup = this.form.get('stepTwo.basic') as FormGroup;
    const extendedGroup = this.form.get('stepTwo.extended') as FormGroup;

    const updateSellTypeValidators = (type: string) => {
      const rent = extendedGroup.get('rent') as FormGroup;
      const purchase = extendedGroup.get('purchase') as FormGroup;
      const offPlan = extendedGroup.get('offPlan') as FormGroup;

      // Reset all
      [rent, purchase, offPlan].forEach((group) => {
        Object.values(group.controls).forEach((ctrl) => ctrl.clearValidators());
      });

      if (type === 'rent') {
        rent
          .get('price')
          ?.setValidators([Validators.required, Validators.min(0)]);
      } else if (type === 'purchase') {
        purchase
          .get('price')
          ?.setValidators([Validators.required, Validators.min(0)]);
      } else if (type === 'offPlan') {
        offPlan.get('delivery_date')?.setValidators([Validators.required]);
        offPlan.get('overall_payment')?.setValidators([Validators.required]);
      }

      [rent, purchase, offPlan].forEach((group) =>
        Object.values(group.controls).forEach((ctrl) =>
          ctrl.updateValueAndValidity()
        )
      );
    };

    const updatePropertyTypeValidators = (type: string) => {
      const apartment = extendedGroup.get('apartment') as FormGroup;
      const villa = extendedGroup.get('villa') as FormGroup;
      const office = extendedGroup.get('office') as FormGroup;

      [apartment, villa, office].forEach((group) =>
        Object.values(group.controls).forEach((ctrl) => ctrl.clearValidators())
      );

      if (type === 'apartment') {
        apartment.get('floor')?.setValidators([Validators.required]);
        apartment.get('building_number')?.setValidators([Validators.required]);
        apartment.get('apartment_number')?.setValidators([Validators.required]);
      } else if (type === 'villa') {
        villa.get('floors')?.setValidators([Validators.required]);
      } else if (type === 'office') {
        office.get('floor')?.setValidators([Validators.required]);
        office.get('building_number')?.setValidators([Validators.required]);
        office.get('apartment_number')?.setValidators([Validators.required]);
      }

      [apartment, villa, office].forEach((group) =>
        Object.values(group.controls).forEach((ctrl) =>
          ctrl.updateValueAndValidity()
        )
      );
    };

    // Set initial validators
    updateSellTypeValidators(basicGroup.get('sellType')?.value);
    updatePropertyTypeValidators(basicGroup.get('propertyType')?.value);

    // Watch for changes
    basicGroup
      .get('sellType')
      ?.valueChanges.subscribe(updateSellTypeValidators);
    basicGroup
      .get('propertyType')
      ?.valueChanges.subscribe(updatePropertyTypeValidators);
  }

  getForm(): FormGroup {
    return this.form;
  }

  get images(): FormArray {
    return this.form.get('stepOne.images') as FormArray;
  }

  addImage(url: string): void {
    const imagesArray = this.images;
    imagesArray.push(new FormControl(url));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  resetForm(): void {
    this.form = this.createForm();
    this.setupConditionalValidators(); // Reset validators after reset
  }
}
