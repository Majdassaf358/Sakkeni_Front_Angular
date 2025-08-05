import { Component, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-step-two',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GoogleMapsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  sellTypes = [
    { id: 1, name: 'rent' },
    { id: 2, name: 'purchase' },
    { id: 3, name: 'offPlan' },
  ];
  propertyTypes = [
    { id: 1, name: 'apartment', group: 'residential' },
    { id: 2, name: 'villa', group: 'residential' },
    { id: 3, name: 'office', group: 'commercial' },
  ];

  selectedSellType: number = 1;
  selectedPropertyType: number = 1;
  showExtendedSection: boolean = false;
  form: FormGroup;
  stepTwo: addProperty = new addProperty();
  countries: { id: number; name: string }[] = [{ id: 1, name: 'Syria' }];
  cities: { id: number; name: string }[] = [
    { id: 1, name: 'Damascus' },
    { id: 2, name: 'Aleppo' },
    { id: 3, name: 'Homs' },
  ];
  exposures: { id: number; name: string }[] = [
    { id: 1, name: 'North' },
    { id: 2, name: 'South' },
    { id: 3, name: 'East' },
    { id: 4, name: 'West' },
    { id: 5, name: 'North‑East' },
    { id: 6, name: 'North‑West' },
    { id: 7, name: 'South‑East' },
    { id: 8, name: 'South‑West' },
  ];
  amenities: { id: number; name: string }[] = [
    { id: 1, name: 'Rerum' },
    { id: 2, name: 'Id' },
    { id: 3, name: 'Voluptatem' },
    { id: 4, name: 'Laudantium' },
    { id: 5, name: 'Sunt' },
    { id: 6, name: 'Blanditiis' },
    { id: 7, name: 'Assumenda' },
    { id: 8, name: 'Recusandae' },
    { id: 9, name: 'Vel' },
    { id: 10, name: 'Repudiandae' },
  ];
  ownership_type_id: { id: number; name: string }[] = [
    { id: 1, name: 'Freehold' },
  ];
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
  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }
  ngOnInit(): void {
    this.setSellType(this.basicGroup.get('sellType')?.value);
    this.setPropertyType(this.basicGroup.get('propertyType')?.value);

    this.basicGroup.get('sellType')?.valueChanges.subscribe((value) => {
      this.setSellType(value);
    });

    this.basicGroup.get('propertyType')?.valueChanges.subscribe((value) => {
      this.setPropertyType(value);
    });

    this.syriaPolygon = new google.maps.Polygon({
      paths: this.syriaPolygonCoords,
    });
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
    this.basicGroup.get('propertyType')!.setValue(id);

    const residential = this.extendedGroup.get('residential') as FormGroup;
    const commercial = this.extendedGroup.get('commercial') as FormGroup;

    residential.get('apartment')?.disable({ emitEvent: false });
    residential.get('villa')?.disable({ emitEvent: false });
    commercial.get('office')?.disable({ emitEvent: false });

    if (id === 1) {
      residential.get('apartment')?.enable({ emitEvent: false });
    } else if (id === 2) {
      residential.get('villa')?.enable({ emitEvent: false });
    } else if (id === 3) {
      commercial.get('office')?.enable({ emitEvent: false });
    }
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
