import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { AddPropertyService } from '../../../Services/add-property.service';

@Component({
  selector: 'app-add-property',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  currentStep = 1;
  form: FormGroup;

  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }
  get isNextDisabled(): boolean {
    if (this.currentStep === 1) {
      return this.formSvc.images.length === 0;
    } else if (this.currentStep === 2) {
      return !this.form.valid;
    }
    return false;
  }
  onNext() {
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
  onSubmit() {}
}
