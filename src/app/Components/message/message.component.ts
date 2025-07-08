import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() message: string = '';

  /** Fired when the user clicks “Okay” */
  @Output() popupClosed = new EventEmitter<void>();

  close() {
    this.popupClosed.emit();
  }
}
