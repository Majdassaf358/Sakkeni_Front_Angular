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
import { addProperty } from '../../../../Models/addProperty';

@Component({
  selector: 'app-step-two',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  showExtendedSection: boolean = false;
  form: FormGroup;
  stepTwo: addProperty = new addProperty();
  countries = ['Syria'];
  cities = ['Damascus', 'Aleppo', 'Homs'];
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
  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }
  ngOnInit(): void {}

  get basicGroup(): FormGroup {
    return this.form.get('stepTwo.basic') as FormGroup;
  }

  get extendedGroup(): FormGroup {
    return this.form.get('stepTwo.extended') as FormGroup;
  }

  toggleExposure(id: number) {
    const exposures = this.form.get('stepTwo.basic.exposures') as FormArray;
    const index = exposures.value.indexOf(id);
    if (index === -1) {
      exposures.push(new FormControl(id));
    } else {
      exposures.removeAt(index);
    }
  }
  isSelected(id: number) {
    return (
      this.form.get('stepTwo.basic.exposures')!.value as number[]
    ).includes(id);
  }
  back() {
    if ((this.form.get('stepTwo.basic') as FormGroup).valid) {
      this.showExtendedSection = false;
    } else {
      this.prev.emit();
    }
  }
  saveAndNext() {
    if ((this.form.get('stepTwo.basic') as FormGroup).invalid) {
      (this.form.get('stepTwo.basic') as FormGroup).markAllAsTouched();
      return;
    } else {
      this.showExtendedSection = true;
      return;
    }
    if ((this.form.get('stepTwo.extended') as FormGroup).invalid) {
      (this.form.get('stepTwo.extended') as FormGroup).markAllAsTouched();
      return;
    }
    this.next.emit();
  }
}
