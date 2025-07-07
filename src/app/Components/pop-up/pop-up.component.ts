import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rent_filter } from '../../Models/filters/rent-filter';
import { purchase_filter } from '../../Models/filters/purchase-filter';
import { off_plan_filter } from '../../Models/filters/off-plan-filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Input() selectedType: string = 'rent';
  @Output() filtersApplied = new EventEmitter<
    rent_filter | purchase_filter | off_plan_filter
  >();
  @Output() popupClosed = new EventEmitter<void>();
  selectedBedrooms: string = '';
  selectedBathrooms: string = '';
  selectedPropertyType: string = '';
  filters: any = {};
  private amenitySet = new Set<number>();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedType']) {
      this.initializeFilters();
    }
  }

  constructor() {
    this.initializeFilters();
  }

  // Initialize base filter values based on selectedType
  private initializeFilters(): void {
    // Common defaults
    this.filters = {
      country_id: 1,
      city_id: null,
      min_area: null,
      max_area: null,
      bathrooms: null,
      balconies: null,
      amenity_ids: [] as number[],
      min_price: null,
      max_price: null,
      is_furnished: null,
    };
    // Type-specific defaults
    if (this.selectedType === 'rent') {
      this.filters.lease_period = 'Yearly';
    } else if (this.selectedType === 'off-plan') {
      this.filters.min_first_pay = null;
      this.filters.max_first_pay = null;
      this.filters.delivery_date = null;
    }
  }

  closePopup(): void {
    this.popupClosed.emit();
  }

  applyFilters(): void {
    // finalize amenity IDs
    this.filters.amenity_ids = Array.from(this.amenitySet);

    // emit with proper type assertion
    if (this.selectedType === 'rent') {
      this.filtersApplied.emit(this.filters as rent_filter);
    } else if (this.selectedType === 'purchase') {
      this.filtersApplied.emit(this.filters as purchase_filter);
    } else if (this.selectedType === 'off-plan') {
      this.filtersApplied.emit(this.filters as off_plan_filter);
    }
    this.closePopup();
  }

  toggleAmenity(id: number): void {
    if (this.amenitySet.has(id)) {
      this.amenitySet.delete(id);
    } else {
      this.amenitySet.add(id);
    }
  }

  // Helper for radio buttons
  selectCity(cityId: number): void {
    this.filters.city_id = cityId;
  }
}
