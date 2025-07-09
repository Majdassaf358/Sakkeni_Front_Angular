import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() message: string = '';
  @Input() image: string = '';

  @Output() popupClosed = new EventEmitter<void>();

  close() {
    this.popupClosed.emit();
  }
}
