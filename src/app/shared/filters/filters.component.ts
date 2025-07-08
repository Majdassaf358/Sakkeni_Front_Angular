import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filters } from '../../Models/filters';
import { PopUpComponent } from '../../Components/pop-up/pop-up.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, PopUpComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() page!: string;
  @Output() typeChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() filterToProperties = new EventEmitter<filters>();
  sideSelect: string = 'list';
  type: string = 'rent';
  filtersSel: filters = new filters();
  showFilterPopup = false;

  constructor() {}
  changeDisplay(change: string) {
    this.filterChange.emit(change);
    this.sideSelect = change;
  }

  changeType(change: string) {
    this.typeChange.emit(change);
    this.type = change;
  }
  getFilteredData() {
    this.filterToProperties.emit(this.filtersSel);
  }
  onFiltersApplied(filters: filters) {
    this.filterToProperties.emit(filters);
    this.showFilterPopup = false;
  }
}
