import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';

import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addProperty } from '../../../../Models/addProperty';
import { lastValueFrom, Subscription } from 'rxjs';
import { id_name } from '../../../../Models/get_ids/id_name';
import { ApiResponse } from '../../../../Models/ApiResponse';
import { ProjectIdsService } from '../../../../Services/project-ids.service';

@Component({
  selector: 'app-step-two',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GoogleMapsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent implements OnInit, OnDestroy {
  private paymentPhasesSub?: Subscription;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  sellTypes = [
    { id: 1, name: 'purchase' },
    { id: 2, name: 'rent' },
    { id: 3, name: 'offPlan' },
  ];
  propertyTypes = [
    { id: 1, name: 'apartment', group: 'residential' },
    { id: 2, name: 'villa', group: 'residential' },
    { id: 3, name: 'office', group: 'commercial' },
  ];
  rentOptions = ['month', 'year'];

  selectedSellType: number = 1;
  selectedPropertyType: number = 1;
  showExtendedSection: boolean = false;
  isfurnitured: number = 1;
  rentUnit: number = 1;
  form: FormGroup;
  stepTwo: addProperty = new addProperty();
  phases = [
    'down_payment',
    'during_construction',
    'on_completion',
    'post_handover',
    'installment_plan',
  ];
  public percentSum = 0;
  public remaining = 100;
  public anySelected = false;
  countries: { id: number; name: string }[] = [{ id: 1, name: 'Syria' }];
  cities: { id: number; name: string }[] = [
    { id: 1, name: 'Damascus' },
    { id: 2, name: 'Aleppo' },
    { id: 3, name: 'Homs' },
    { id: 4, name: 'Latakia' },
    { id: 5, name: 'Hama' },
    { id: 6, name: 'Daraa' },
    { id: 7, name: 'Deir ez-Zor' },
    { id: 8, name: 'Raqqa' },
    { id: 9, name: 'Tartus' },
  ];
  exposures: id_name[] = [];

  amenities: id_name[] = [];
  ownership_type_id: id_name[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 33.499997429698276,
    lng: 36.26559615601456,
  };
  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];
  syriaPolygonCoords = [
    { lat: 32.0, lng: 36.8 },
    { lat: 32.6, lng: 38.5 },
    { lat: 33.2, lng: 39.2 },
    { lat: 34.0, lng: 39.0 },
    { lat: 35.0, lng: 40.0 },
    { lat: 36.2, lng: 41.0 },
    { lat: 37.0, lng: 40.5 },
    { lat: 37.3, lng: 38.0 },
    { lat: 36.8, lng: 36.7 },
    { lat: 35.7, lng: 35.8 },
    { lat: 34.5, lng: 35.7 },
    { lat: 33.3, lng: 36.2 },
    { lat: 32.7, lng: 36.0 },
    { lat: 32.0, lng: 36.8 },
  ];
  syriaPolygon: google.maps.Polygon = new google.maps.Polygon();
  Math = Math;
  constructor(
    public formSvc: AddPropertyService,
    private helpsrv: ProjectIdsService
  ) {
    this.form = this.formSvc.getForm();
  }
  ngOnInit(): void {
    this.syriaPolygon = new google.maps.Polygon({
      paths: this.syriaPolygonCoords,
    });
    const arr = this.paymentPhases;
    if (arr) {
      this.recalculatePercentSum();

      this.paymentPhasesSub = arr.valueChanges.subscribe(() => {
        this.recalculatePercentSum();
      });
    }
    this.getIds();
  }

  ngOnDestroy(): void {
    this.paymentPhasesSub?.unsubscribe();
  }

  get basicGroup(): FormGroup {
    return this.form.get('stepTwo.basic') as FormGroup;
  }

  get extendedGroup(): FormGroup {
    return this.form.get('stepTwo.extended') as FormGroup;
  }
  get residentialGroup(): FormGroup {
    return this.extendedGroup.get('residential') as FormGroup;
  }

  get commercialGroup(): FormGroup {
    return this.extendedGroup.get('commercial') as FormGroup;
  }
  get offPlanGroup(): FormGroup {
    return this.extendedGroup.get('offPlan') as FormGroup;
  }

  get paymentPhases(): FormArray {
    return this.offPlanGroup.get('payment_phases') as FormArray;
  }
  phaseAt(i: number) {
    return this.paymentPhases.at(i) as FormGroup;
  }
  private recalculatePercentSum(): void {
    const arr = this.paymentPhases?.controls ?? [];
    let sum = 0;
    let anySel = false;

    for (const pg of arr) {
      const sel = pg.get('selected')?.value;
      if (sel) {
        anySel = true;
        const raw = pg.get('payment_percentage')?.value;
        // allow only integer parsing; if invalid treat as 0
        const n =
          raw !== null && raw !== undefined && String(raw).trim() !== ''
            ? parseInt(String(raw), 10)
            : 0;
        sum += Number.isNaN(n) ? 0 : n;
      }
    }

    this.percentSum = sum;
    this.remaining = 100 - sum;
    this.anySelected = anySel;
  }

  /** Helper used in template to decide whether a percentage input should be highlighted */
  shouldHighlightPercentInput(index: number): boolean {
    // highlight when there is a mismatch (sum !== 100) AND this phase is selected
    const pg = this.phaseAt(index);
    const sel = !!pg.get('selected')?.value;
    const mismatch = this.anySelected && this.percentSum !== 100;
    return sel && mismatch;
  }

  /** Helper for template to return css class for remaining text */
  remainingClass(): string {
    if (!this.anySelected) return 'neutral';
    if (this.remaining === 0) return 'ok';
    if (this.remaining > 0) return 'positive'; // still room (orange)
    return 'negative'; // over 100 (red)
  }
  setSellType(id: number): void {
    this.selectedSellType = id;
    this.basicGroup.get('sellType')!.setValue(id);
    const ext = this.extendedGroup;

    this.sellTypes.forEach(({ id: t, name }) => {
      const grp = ext.get(name) as FormGroup | null;
      if (!grp) {
        console.warn(`Missing group for sellType: ${name}`);
        return;
      }

      if (t === id) {
        grp.enable({ emitEvent: false });
      } else {
        grp.disable({ emitEvent: false });
      }
    });
  }

  setPropertyType(id: number): void {
    this.selectedPropertyType = id;

    const residential = this.extendedGroup.get('residential') as FormGroup;
    const commercial = this.extendedGroup.get('commercial') as FormGroup;

    residential.get('apartment')?.disable({ emitEvent: false });
    residential.get('villa')?.disable({ emitEvent: false });
    commercial.get('office')?.disable({ emitEvent: false });

    if (id === 1) {
      this.form
        .get('stepTwo.extended.residential.residential_property_type_id')
        ?.setValue(1);
      this.basicGroup.get('propertyType')!.setValue(1);

      residential.get('apartment')?.enable({ emitEvent: false });
    } else if (id === 2) {
      this.form
        .get('stepTwo.extended.residential.residential_property_type_id')
        ?.setValue(2);
      this.basicGroup.get('propertyType')!.setValue(1);

      residential.get('villa')?.enable({ emitEvent: false });
    } else if (id === 3) {
      this.form
        .get('stepTwo.extended.commercial.commercial_property_type_id')
        ?.setValue(1);
      this.basicGroup.get('propertyType')!.setValue(2);

      commercial.get('office')?.enable({ emitEvent: false });
    }
  }
  swichFurnitured(number: number) {
    this.isfurnitured = number;
    if (this.selectedSellType === 1) {
      this.form.get('stepTwo.extended.purchase.is_furnished')?.setValue(number);
    }
    if (this.selectedSellType === 2) {
      this.form.get('stepTwo.extended.rent.is_furnished')?.setValue(number);
    }
    console.log(this.isfurnitured);
  }
  toggleSelection(path: string, id: number): void {
    const array = this.form.get(path) as FormArray;
    const index = array.value.indexOf(id);
    if (index === -1) {
      array.push(new FormControl(id));
    } else {
      array.removeAt(index);
    }
  }

  isSelected(path: string, id: number): boolean {
    const array = this.form.get(path) as FormArray;
    return array?.value?.includes(id);
  }
  back() {
    if ((this.form.get('stepTwo.basic') as FormGroup).valid) {
      this.showExtendedSection = false;
    } else {
      this.prev.emit();
    }
  }
  sendRentUnit(n: string) {
    this.form.get('stepTwo.extended.rent.lease_period_unit')?.setValue(n);
  }
  async getIds() {
    try {
      let res1: ApiResponse<id_name[]> = await lastValueFrom(
        this.helpsrv.getAmenities()
      );
      let res2: ApiResponse<id_name[]> = await lastValueFrom(
        this.helpsrv.getDirections()
      );
      let res3: ApiResponse<id_name[]> = await lastValueFrom(
        this.helpsrv.getOwnershipTypes()
      );
      this.amenities = res1.data;
      this.exposures = res2.data;
      this.ownership_type_id = res3.data;
    } catch (err) {
      console.log(err);
    }
  }
  saveAndNext(): boolean {
    const basic = this.form.get('stepTwo.basic') as FormGroup;
    const extended = this.form.get('stepTwo.extended') as FormGroup;

    if (basic.invalid) {
      basic.markAllAsTouched();
      console.log('first');

      return false;
    }
    if (!this.showExtendedSection) {
      console.log('second');
      this.showExtendedSection = true;
      return false;
    }

    if (extended.invalid) {
      console.log('third');
      extended.markAllAsTouched();
      return false;
    }
    console.log('four');

    return true;
  }
  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const latLng = event.latLng;
      const isInsideSyria = google.maps.geometry.poly.containsLocation(
        latLng,
        this.syriaPolygon
      );

      if (isInsideSyria) {
        const position = latLng.toJSON();
        console.log('Clicked position:', position);

        this.markers = [
          {
            position,
            title: `Marker at (${position.lat}, ${position.lng})`,
          },
        ];

        this.form.get('stepTwo.basic.latitude')?.setValue(position.lat);
        this.form.get('stepTwo.basic.longitude')?.setValue(position.lng);
      } else {
        console.log('Only locations in Syria are allowed.');
      }
    }
  }
}
