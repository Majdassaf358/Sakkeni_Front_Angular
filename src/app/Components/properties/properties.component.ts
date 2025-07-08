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
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-properties',
  imports: [
    NavbarComponent,
    FiltersComponent,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
  sideFilter: string = 'list';
  viewType: string = 'rent';
  propertyType!: string;
  receivedFilters!: filters;
  savedCardIds = new Set<number>();
  currentPage: number = 1;
  properties: propertyCard[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 33.42565943762839,
    lng: 36.94301086943456,
  };

  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];

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
        this.propertyservice.viewProperty(this.viewType, 1)
      );
      this.currentPage = res.data.current_page;
      this.properties = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async filterProperties() {
    try {
      this.properties = [];
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.filterProperty(
          this.viewType,
          1,
          this.receivedFilters
        )
      );
      this.currentPage = res.data.current_page;
      this.properties = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  updateSideFilter(value: string) {
    this.sideFilter = value;
  }
  updateViewType(value: string) {
    this.viewType = value;
    this.getProperties();
  }
  goToDetails(id: number) {
    this.router.navigate(['/home-details', id]);
  }
  handleFiltersUpdate(newFilters: filters) {
    this.receivedFilters = newFilters;
    this.filterProperties();
  }
  toggleSave(index: number) {
    if (this.savedCardIds.has(index)) {
      this.savedCardIds.delete(index);
    } else {
      this.savedCardIds.add(index);
    }
  }
  getPrice(card: propertyCard): number | string {
    switch (this.viewType) {
      case 'rent':
        return card.rent?.price ?? 'N/A';
      case 'purchase':
        return card.purchase?.price ?? 'N/A';
      case 'off_plan':
        return card.off_plan?.overall_payment ?? 'N/A';
      default:
        return 'N/A';
    }
  }
  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const position = event.latLng.toJSON();
      console.log('Clicked position:', position);
      this.markers.push({
        position,
        title: `Marker at (${position.lat},${position.lng})`,
      });
    }
  }
}
