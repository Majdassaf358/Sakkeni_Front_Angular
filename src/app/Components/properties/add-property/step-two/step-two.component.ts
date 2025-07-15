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
  form: FormGroup;
  stepTwo: addProperty = new addProperty();
  countries = ['Syria'];
  cities = ['Damascus', 'Aleppo', 'Homs'];
  selectedExposures = new Set<number>();
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
  ngOnInit(): void {
    console.log('Images in service:', this.formSvc.images.value);
    console.log(
      'Images via form:',
      (this.form.get('images') as FormArray).value
    );
  }
  toggleExposure(id: number) {
    const exposures = this.form.get('exposures') as FormArray;
    const index = exposures.value.indexOf(id);
    if (index === -1) {
      exposures.push(new FormControl(id));
    } else {
      exposures.removeAt(index);
    }
  }
  isSelected(id: number) {
    return (this.form.get('exposures')!.value as number[]).includes(id);
  }
  back() {
    console.log(this.form);
    this.prev.emit();
  }
  saveAndNext() {
    this.next.emit();
  }
}
