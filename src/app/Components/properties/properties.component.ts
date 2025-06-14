import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { propertyCard } from '../../Models/property-card';
import { PaginatedData } from '../../Models/paginatedData';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { PropertyService } from '../../Services/property.service';
import { FormsModule } from '@angular/forms';
import { filters } from '../../Models/filters';

@Component({
  selector: 'app-properties',
  imports: [NavbarComponent, FiltersComponent, CommonModule, FormsModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
  sideFilter: string = 'list';
  currentPage: number = 1;
  properties: propertyCard[] = [];
  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  ngOnInit(): void {
    this.getProperties();
  }
  async getProperties() {
    try {
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.viewProperty()
      );
      this.currentPage = res.data.current_page;
      this.properties = res.data.data;
      console.log(this.properties);
    } catch (error) {
      console.log(error);
    }
  }
  updateSideFilter(Value: string) {
    this.sideFilter = Value;
  }
  updateView(Value: filters) {}
  goToDetails() {
    this.router.navigate(['/homes-details']);
  }
}
