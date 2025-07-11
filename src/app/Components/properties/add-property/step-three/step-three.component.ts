import { Component, Output, EventEmitter } from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';

@Component({
  selector: 'app-step-three',
  imports: [],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  // form = this.formSvc.getForm();

  constructor(private formSvc: AddPropertyService) {}

  back() {
    this.prev.emit();
  }
  finish() {
    // finalize or send formSvc.getForm() to server
    this.submit.emit();
  }
}
