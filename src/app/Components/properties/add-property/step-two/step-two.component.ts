import { Component, Output, EventEmitter } from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  form: FormGroup;
  countries = ['Syria', 'Lebanon', 'Jordan'];
  cities = ['Damascus', 'Aleppo', 'Homs'];
  exposures = [
    'North',
    'South',
    'East',
    'West',
    'Northeast',
    'Northwest',
    'Southeast',
    'Southwest',
  ];
  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }
  ngOnInit(): void {
    // ensure the controls exist (you can also initialize these in the service)
    if (!this.form.get('country')) {
      this.form.addControl('country', new FormControl(this.countries[0]));
      this.form.addControl('city', new FormControl(this.cities[0]));
      this.form.addControl('location', new FormControl(''));
      this.form.addControl('exposure', new FormControl(''));
      this.form.addControl('area', new FormControl(null));
      this.form.addControl('bathrooms', new FormControl(null));
      this.form.addControl('sellType', new FormControl('rent'));
      this.form.addControl('propertyType', new FormControl('apartment'));
      this.form.addControl('price', new FormControl(null));
      this.form.addControl('floorNumber', new FormControl(null));
      this.form.addControl('leasePeriod', new FormControl(''));
      this.form.addControl('buildingNumber', new FormControl(''));
      this.form.addControl('paymentPlan', new FormControl(''));
      this.form.addControl('apartmentNumber', new FormControl(''));
      this.form.addControl('furnishing', new FormControl(''));
    }
    console.log('Images in service:', this.formSvc.images.value);
    console.log(
      'Images via form:',
      (this.form.get('images') as FormArray).value
    );
  }
  // form = this.formSvc.getFormData();
  back() {
    console.log(this.form);
    this.prev.emit();
  }
  saveAndNext() {
    this.next.emit();
  }
}
