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
  savedCardIds = new Set<number>();
  sideFilter: string = 'list';
  viewType: string = 'rent';
  propertyType!: string;
  currentPage: number = 1;
  receivedFilters!: filters;
  properties: propertyCard[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 33.42565943762839,
    lng: 36.94301086943456,
  };
  markerLatLong: google.maps.LatLngLiteral[] = [
    { lat: 33.56565943762839, lng: 36.84301086943456 },
    { lat: 33.57765943762839, lng: 36.87301086943456 },
  ];

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
        this.propertyservice.viewProperty(this.viewType)
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
        this.propertyservice.filterProperty('rent', 1, this.receivedFilters)
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
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log('Clicked coordinates:', { lat, lng });
    }
  }
}
