import { Injectable } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiResponse } from '../Models/ApiResponse';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddPropertyService {
  private form: FormGroup;
  private selectedSubs: Subscription[] = [];
  private paymentPhasesSub?: Subscription;
  phases = [
    'down_payment',
    'during_construction',
    'on_completion',
    'post_handover',
    'installment_plan',
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.createForm();
    this.attachOffPlanValidator();
  }
  private attachOffPlanValidator(): void {
    const offPlan = this.getOffPlanGroup();
    if (!offPlan) return;

    offPlan.setValidators(this.totalPercentageValidator());
    offPlan.updateValueAndValidity({ onlySelf: true, emitEvent: false });

    // subscribe to payment_phases value changes so the validator runs when any child changes
    const paymentPhases = this.getPaymentPhases();
    if (paymentPhases) {
      // unsubscribe previous if any
      this.paymentPhasesSub?.unsubscribe();
      this.paymentPhasesSub = paymentPhases.valueChanges.subscribe(() => {
        offPlan.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      });
    }
  }

  /** Validator: if any selected phase exists, the sum of selected percentages must equal 100 */
  private totalPercentageValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const offPlanGroup = control as FormGroup;
      const paymentPhases = offPlanGroup.get(
        'payment_phases'
      ) as FormArray | null;

      if (!paymentPhases) return null;

      // gather selected phase groups
      const selectedPhaseGroups = paymentPhases.controls.filter((pg) => {
        const selCtrl = pg.get('selected');
        return !!selCtrl && !!selCtrl.value;
      });

      // if nothing selected, no validation error (you can change this if you want "at least one" enforced)
      if (selectedPhaseGroups.length === 0) {
        return null;
      }

      // compute integer sum (treat missing/invalid as 0)
      const sum = selectedPhaseGroups
        .map((pg) => {
          const pct = pg.get('payment_percentage')?.value;
          // ensure integers only — parseInt will ignore decimals after the decimal point but we rely on control validators to prevent decimals
          const n = Number.isFinite(+pct) ? parseInt(String(pct), 10) : 0;
          return Number.isNaN(n) ? 0 : n;
        })
        .reduce((a, b) => a + b, 0);

      // enforce exact 100
      return sum === 100 ? null : { percentageTotalNot100: { sum } };
    };
  }

  // cleanup
  public destroy(): void {
    this.selectedSubs.forEach((s) => s.unsubscribe());
    this.selectedSubs = [];
    this.paymentPhasesSub?.unsubscribe();
    this.paymentPhasesSub = undefined;
  }

  ngOnDestroy(): void {
    this.destroy();
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
            payment_phases: this.fb.array(
              this.phases.map((_, idx) => this.createPhase(idx))
            ),
          }),
        }),
      }),
    });
  }

  getForm(): FormGroup {
    return this.form;
  }
  public getOffPlanGroup(): FormGroup {
    return this.form.get('stepTwo.extended.offPlan') as FormGroup;
  }
  public getPaymentPhases(): FormArray {
    return this.getOffPlanGroup().get('payment_phases') as FormArray;
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
  private createPhase(index: number): FormGroup {
    const grp = this.fb.group({
      selected: [false],
      payment_phase_id: [index + 1],
      // start disabled (will be enabled when selected)
      payment_percentage: [
        { value: null, disabled: true },
        [Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)],
      ],
      duration_value: [
        { value: null, disabled: true },
        [Validators.min(0), Validators.pattern(/^\d+$/)],
      ],
      duration_unit: [{ value: null, disabled: true }],
    });

    this.watchPhaseSelected(grp);

    return grp;
  }

  private watchPhaseSelected(phaseGroup: FormGroup) {
    const sel = phaseGroup.get('selected');
    if (!sel) return;

    const sub = sel.valueChanges.subscribe((isSelected: boolean) => {
      const pct = phaseGroup.get('payment_percentage');
      const durVal = phaseGroup.get('duration_value');
      const durUnit = phaseGroup.get('duration_unit');
      if (!pct || !durVal || !durUnit) return;
      if (isSelected) {
        pct.enable({ emitEvent: false });
        pct.setValidators([
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^\d+$/),
        ]);
        pct.updateValueAndValidity({ onlySelf: true, emitEvent: false });

        durVal.enable({ emitEvent: false });
        durVal.setValidators([
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^\d+$/),
        ]);
        durVal.updateValueAndValidity({ onlySelf: true, emitEvent: false });

        durUnit.enable({ emitEvent: false });
        durUnit.setValidators([Validators.required]);
        durUnit.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      } else {
        pct.setValue(null, { emitEvent: false });
        pct.clearValidators();
        pct.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        pct.disable({ emitEvent: false });

        durVal.setValue(null, { emitEvent: false });
        durVal.clearValidators();
        durVal.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        durVal.disable({ emitEvent: false });

        durUnit.setValue(null, { emitEvent: false });
        durUnit.clearValidators();
        durUnit.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        durUnit.disable({ emitEvent: false });
      }
    });

    this.selectedSubs.push(sub);

    const initiallySelected = !!sel.value;
    if (!initiallySelected) {
      phaseGroup.get('payment_percentage')!.disable({ emitEvent: false });
      phaseGroup.get('duration_value')!.disable({ emitEvent: false });
      phaseGroup.get('duration_unit')!.disable({ emitEvent: false });
    } else {
      sel.setValue(true, { emitEvent: true });
    }
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
      formData.append('price', extended.rent.price);
      formData.append('lease_period_value', extended.rent.lease_period_value);
      formData.append('lease_period_unit', extended.rent.lease_period_unit);
      formData.append('is_furnished', extended.rent.is_furnished);
    }
    if (basic.sellType == 1) {
      formData.append('price', extended.purchase.price);
      formData.append('is_furnished', extended.purchase.is_furnished);
    }
    if (basic.sellType == 3) {
      formData.append('delivery_date', extended.offPlan.delivery_date);
      formData.append('overall_payment', extended.offPlan.overall_payment);
    }
    if (extended.residential.residential_property_type_id === 1) {
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
      formData.append('bedrooms', extended.residential.villa.bedrooms);
      formData.append('floors', extended.residential.villa.floors);
    } else {
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
