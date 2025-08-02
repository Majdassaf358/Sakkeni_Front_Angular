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
  selectedSellType: string = 'rent';
  selectedPropertyType: string = 'apartment';
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
  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }
  ngOnInit(): void {
    const sellTypeControl = this.extendedGroup.get('sellType');
    const propertyTypeControl = this.extendedGroup.get('propertyType');
    if (propertyTypeControl) {
      this.selectedPropertyType = propertyTypeControl.value;
    }
    if (sellTypeControl) {
      this.selectedSellType = sellTypeControl.value;
    }
  }

  get basicGroup(): FormGroup {
    return this.form.get('stepTwo.basic') as FormGroup;
  }

  get extendedGroup(): FormGroup {
    return this.form.get('stepTwo.extended') as FormGroup;
  }
  setSellType(type: string): void {
    this.selectedSellType = type;
    this.extendedGroup.get('sellType')?.setValue(type);
  }
  setPropertyType(type: string): void {
    this.selectedPropertyType = type;
    this.extendedGroup.get('propertyType')?.setValue(type);
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
  saveAndNext() {
    const basic = this.form.get('stepTwo.basic') as FormGroup;
    const extended = this.form.get('stepTwo.extended') as FormGroup;

    if (basic.invalid) {
      basic.markAllAsTouched();
      return;
    }

    this.showExtendedSection = true;

    if (extended.valid) {
      this.next.emit();
    } else {
      extended.markAllAsTouched();
    }
  }
}
