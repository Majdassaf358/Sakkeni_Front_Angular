import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { propertyCard } from '../../../Models/property-card';
import { PaginatedData } from '../../../Models/paginatedData';
import { ApiResponse } from '../../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { PropertyService } from '../../../Services/property.service';
import { FormsModule } from '@angular/forms';
import { filters } from '../../../Models/filters';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { FiltersComponent } from '../../../shared/filters/filters.component';
import { add_favourite } from '../../../Models/add_favorite';
import { favoriteCard } from '../../../Models/favorite_card';

@Component({
  selector: 'app-view-properties',
  imports: [
    NavbarComponent,
    FiltersComponent,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
  ],
  templateUrl: './view-properties.component.html',
  styleUrl: './view-properties.component.css',
})
export class ViewPropertiesComponent implements OnInit {
  @ViewChild('infoWindow', { static: false })
  infoWindow!: MapInfoWindow;
  sideFilter: string = 'list';
  viewType: string = 'rent';
  propertyType!: string;
  receivedFilters!: filters;
  favourite_property!: add_favourite;
  favoriteIds: Set<number> = new Set();
  currentPage: number = 1;
  properties: propertyCard[] = [];
  currentFavoritePage: number = 1;
  favoriteProperties: favoriteCard[] = [];
  imageUrl: string = 'http://127.0.0.1:8000/';

  center: google.maps.LatLngLiteral = {
    lat: 33.42565943762839,
    lng: 36.94301086943456,
  };

  markers: Array<{ position: google.maps.LatLngLiteral; data: propertyCard }> =
    [];
  hoveredProperty: propertyCard | null = null;
  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  ngOnInit(): void {
    this.getProperties();
    this.getFavorites();
  }
  async getProperties() {
    try {
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.viewProperty(this.viewType, 1)
      );
      this.currentPage = res.data.current_page;
      this.properties = res.data.data;
      this.markers = this.properties.map((p) => ({
        data: p,
        position: { lat: p.location.latitude, lng: p.location.longitude },
      }));
    } catch (error) {
      console.log(error);
    }
  }
  async getFavorites() {
    try {
      let res: ApiResponse<PaginatedData<favoriteCard>> = await lastValueFrom(
        this.propertyservice.viewFavoriteProperty(this.viewType)
      );
      this.currentFavoritePage = res.data.current_page;
      this.favoriteProperties = res.data.data;

      this.favoriteIds.clear();
      this.favoriteProperties.forEach((fr) =>
        this.favoriteIds.add(fr.property_id)
      );

      this.markers = this.favoriteProperties.map((fr) => ({
        data: fr.property,
        position: {
          lat: fr.property.location.latitude,
          lng: fr.property.location.longitude,
        },
      }));
      console.log('Loaded favoriteIds:', Array.from(this.favoriteIds));
    } catch (error) {
      console.log(error);
    }
  }
  async addToFavorites(id: number) {
    try {
      const res = await lastValueFrom(this.propertyservice.addToFavorite(id));
      this.favourite_property = res.data;
      this.favoriteIds.add(id);
      console.log(id, 'added');
      console.log(this.favoriteIds);
    } catch (error) {
      console.log(error);
    }
  }

  async removeFavorites(id: number) {
    try {
      await lastValueFrom(this.propertyservice.removeFromFavorite(id));

      this.favoriteIds.delete(id);
      console.log(id, 'removed');
      console.log(this.favoriteIds);
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
  toggleFavorite(id: number) {
    if (this.favoriteIds.has(id)) {
      console.log('going to remove');
      this.removeFavorites(id);
    } else {
      console.log('going to add');
      this.addToFavorites(id);
    }
  }
  openInfoWindow(marker: MapMarker, markerData: { data: propertyCard }) {
    this.hoveredProperty = markerData.data;
    this.infoWindow.open(marker);
  }
  updateSideFilter(value: string) {
    this.sideFilter = value;
  }
  updateViewType(value: string) {
    this.viewType = value;
    this.getProperties();
    this.getFavorites();
  }
  goToDetails(id: number) {
    this.router.navigate(['/home-details', id]);
  }
  handleFiltersUpdate(newFilters: filters) {
    this.receivedFilters = newFilters;
    this.filterProperties();
  }
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target.src !== 'assets/Imgs/pool.jpg') {
      target.src = 'assets/Imgs/pool.jpg';
    }
  }

  getPrice(card: propertyCard): number | string {
    switch (this.viewType) {
      case 'rent':
        return card.rent?.price != null && card.rent?.lease_period_unit
          ? `${card.rent.price}/${card.rent.lease_period_unit}`
          : 'N/A';
      case 'purchase':
        return card.purchase?.price ?? 'N/A';
      case 'off-plan':
        return card.off_plan?.overall_payment ?? 'N/A';
      default:
        return 'N/A';
    }
  }
  onMarkerClick(id: number) {
    console.log('Clicked property ID:', id);
  }
}
