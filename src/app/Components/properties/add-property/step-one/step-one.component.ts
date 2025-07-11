import { Component, Output, EventEmitter } from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';

@Component({
  selector: 'app-step-one',
  imports: [],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css',
})
export class StepOneComponent {
  @Output() next = new EventEmitter<void>();

  constructor(private formSvc: AddPropertyService) {}

  // form = this.formSvc.getFormData();
  saveAndNext() {
    this.next.emit();
  }
}
