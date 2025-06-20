import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filters } from '../../Models/filters';

@Component({
  selector: 'app-pop-up',
  imports: [FormsModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Output() filtersApplied = new EventEmitter<any>();
  @Output() popupClosed = new EventEmitter<void>();

  filterData: filters = new filters();

  closePopup(): void {
    this.popupClosed.emit();
  }

  applyFilters(): void {
    this.filtersApplied.emit(this.filterData);
    this.closePopup();
  }
}
