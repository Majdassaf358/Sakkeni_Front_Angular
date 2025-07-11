import { Component, Output, EventEmitter } from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';

@Component({
  selector: 'app-step-two',
  imports: [],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor(private formSvc: AddPropertyService) {}

  // form = this.formSvc.getFormData();
  back() {
    this.prev.emit();
  }
  saveAndNext() {
    this.next.emit();
  }
}
