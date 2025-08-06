import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-message',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() from: string = '';
  @Input() message: string = '';
  @Input() image: string = '';

  @Output() popupClosed = new EventEmitter<void>();
  constructor(private router: Router) {}
  close() {
    if (this.from === 'add') {
      console.log(this.from);
      this.popupClosed.emit();
      this.router.navigate(['/properties']);
    } else {
      this.popupClosed.emit();
    }
  }
}
