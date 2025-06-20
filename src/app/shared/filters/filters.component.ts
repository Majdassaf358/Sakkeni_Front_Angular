import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../Services/property.service';
import { filters } from '../../Models/filters';
import { PopUpComponent } from '../../Components/pop-up/pop-up.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, PopUpComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() page!: string;
  @Output() filterChange = new EventEmitter<string>();
  @Output() filter = new EventEmitter<filters>();
  sideSelect: string = 'list';
  type: string = 'rent';
  filtersSel: filters = new filters();
  showFilterPopup = false;

  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  changeDisplay(change: string) {
    this.filterChange.emit(change);
    this.sideSelect = change;
  }
  changeType(change: string) {
    // this.filterChange.emit(change);
    this.type = change;
  }
  getFilteredData() {
    console.log('Child: Filters Updated', this.filtersSel);
    this.filter.emit(this.filtersSel);
  }
  onFiltersApplied(filters: any) {
    console.log('Filter data:', filters);
    // Implement your filter logic here
    this.showFilterPopup = false;
  }
}
