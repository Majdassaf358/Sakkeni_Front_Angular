import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';

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

  goTo(step: number) {
    this.currentStep = step;
  }
  onSubmit() {}
}
