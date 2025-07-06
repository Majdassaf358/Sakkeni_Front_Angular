import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filters } from '../../Models/filters';
import { rent_filter } from '../../Models/filters/rent-filter';
import { purchase_filter } from '../../Models/filters/purchase-filter';
import { off_plan_filter } from '../../Models/filters/off-plan-filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Output() filtersApplied = new EventEmitter<
    rent_filter | purchase_filter | off_plan_filter
  >();
  @Output() popupClosed = new EventEmitter<void>();

  selectedType: 'rent' | 'purchase' | 'off-plan' = 'rent'; // <-- set this dynamically from UI

  selectedBedrooms: string = ''; // e.g., "1", "More"
  selectedBathrooms: string = '';
  selectedPropertyType: string = ''; // e.g., "Apartment", "Villa", "Office"

  closePopup(): void {
    this.popupClosed.emit();
  }

  applyFilters(): void {
    const filterBody = this.buildFilterBody();
    this.filtersApplied.emit(filterBody);
    this.closePopup();
  }

  buildFilterBody(): rent_filter | purchase_filter | off_plan_filter {
    const convertValue = (val: string) => (val === 'More' ? 6 : Number(val));

    const base = {
      country_id: 1,
      city_id: 1,
      min_area: 50,
      max_area: 200,
      bathrooms: convertValue(this.selectedBathrooms),
      balconies: 1,
      amenity_ids: this.mapPropertyType(this.selectedPropertyType),
      min_price: 1000,
      max_price: 5000,
      is_furnished: 1,
    };

    if (this.selectedType === 'rent') {
      return {
        ...base,
        lease_period: 'Yearly',
      };
    }

    if (this.selectedType === 'purchase') {
      return base;
    }

    if (this.selectedType === 'off-plan') {
      return {
        ...base,
        min_first_pay: 5000,
        max_first_pay: 20000,
        delivery_date: 2026,
      };
    }

    throw new Error('Invalid selectedType');
  }

  mapPropertyType(type: string): number[] {
    switch (type) {
      case 'Apartment':
        return [1]; // Example ID
      case 'Villa':
        return [2];
      case 'Office':
        return [3];
      default:
        return [];
    }
  }
}
