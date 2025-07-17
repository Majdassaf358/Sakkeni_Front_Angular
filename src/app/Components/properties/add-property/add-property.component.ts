import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormsModule } from '@angular/forms';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { AddPropertyService } from '../../../Services/add-property.service';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-add-property',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    MessageComponent,
  ],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  currentStep = 1;
  form: FormGroup;
  popupMessage: string | null = null;

  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }
  get isNextDisabled(): boolean {
    if (this.currentStep === 1) {
      const imgs = this.form.get('stepOne.images') as FormArray;
      return imgs.length === 0;
    } else if (this.currentStep === 2) {
      return !this.form.valid;
    }
    return false;
  }
  onNext() {
    console.log(
      'onNext() called – step=',
      this.currentStep,
      ' form.valid=',
      this.form.valid,
      ' values=',
      this.form.value
    );
    if (this.currentStep === 1) {
      const imgs = this.form.get('stepOne.images') as FormArray;
      if (imgs.length < 3) {
        this.popupMessage = 'Please upload at least 3 photos…';
        return;
      }
    }

    if (this.currentStep === 2) {
      if (this.form.valid) {
        this.currentStep++;
      } else {
        this.form.markAllAsTouched();
      }
    } else {
      this.currentStep = Math.min(3, this.currentStep + 1);
    }
  }

  onPrev() {
    this.currentStep = Math.max(1, this.currentStep - 1);
  }
  goTo(step: number) {
    this.currentStep = step;
  }
  closePopup() {
    this.popupMessage = null;
  }
  onSubmit() {}
}
