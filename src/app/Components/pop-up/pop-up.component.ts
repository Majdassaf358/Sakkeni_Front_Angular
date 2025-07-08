import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filters } from '../../Models/filters';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Input() selectedType: string = 'rent';
  @Output() filtersApplied = new EventEmitter<filters>();
  @Output() popupClosed = new EventEmitter<void>();
  selectedPropertyType: string = '';
  filterValues: filters = new filters();
  private amenitySet = new Set<number>();

  constructor() {}

  applyFilters() {
    this.filterValues.amenity_ids = Array.from(this.amenitySet);
    this.filtersApplied.emit(this.filterValues);
    console.log(this.filterValues);
    this.closePopup();
  }

  toggleAmenity(id: number) {
    if (this.amenitySet.has(id)) {
      this.amenitySet.delete(id);
    } else {
      this.amenitySet.add(id);
    }
  }

  closePopup() {
    this.popupClosed.emit();
  }
}
