import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../Models/ApiResponse';
import { PaginatedData } from '../../Models/paginatedData';
import { propertyCard } from '../../Models/property-card';
import { RouterModule, Router } from '@angular/router';
import { PropertyService } from '../../Services/property.service';
import { lastValueFrom } from 'rxjs';
import { filters } from '../../Models/filters';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() page!: string;
  @Output() filterChange = new EventEmitter<string>();
  sideSelect: string = 'list';
  properties: propertyCard[] = [];
  filtersVal: filters = new filters();

  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  changeDisplay(change: string) {
    this.filterChange.emit(change);
    this.sideSelect = change;
  }
  async getProperties() {
    try {
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.filterProperty('rent', 1, this.filtersVal)
      );
      this.properties = res.data.data;
      console.log(this.properties);
    } catch (error) {
      console.log(error);
    }
  }
  sendFilter() {}
}
