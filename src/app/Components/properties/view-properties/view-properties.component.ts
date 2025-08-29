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
  properties: propertyCard[] = [];
  favoriteProperties: favoriteCard[] = [];
  imageUrl: string = 'http://127.0.0.1:8000/';
  pages: number[] = [];
  currentPage: number = 1;
  currentFavoritePage: number = 1;
  pagination: any;
  lastQuery = '';

  center: google.maps.LatLngLiteral = {
    lat: 33.42565943762839,
    lng: 36.94301086943456,
  };

  markers: Array<{ position: google.maps.LatLngLiteral; data: propertyCard }> =
    [];
  hoveredProperty: propertyCard = new propertyCard();
  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  ngOnInit(): void {
    this.getProperties(1);
    this.getFavorites(1);
  }
  async getProperties(page: number) {
    try {
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.viewProperty(this.viewType, page)
      );
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
      this.properties = res.data.data;
      this.markers = this.properties.map((p) => ({
        data: p,
        position: { lat: p.location.latitude, lng: p.location.longitude },
      }));
      this.computePages();
    } catch (error) {
      console.log(error);
    }
  }
  async getFavorites(page: number) {
    try {
      let res: ApiResponse<PaginatedData<favoriteCard>> = await lastValueFrom(
        this.propertyservice.viewFavoriteProperty(this.viewType, page)
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
      this.computePages();
    } catch (error) {
      console.log(error);
    }
  }
  async addToFavorites(id: number) {
    try {
      const res = await lastValueFrom(this.propertyservice.addToFavorite(id));
      this.favourite_property = res.data;
      this.favoriteIds.add(id);
    } catch (error) {
      console.log(error);
    }
  }

  async removeFavorites(id: number) {
    try {
      await lastValueFrom(this.propertyservice.removeFromFavorite(id));

      this.favoriteIds.delete(id);
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
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async onFilterSearch(query: string) {
    try {
      this.lastQuery = query;
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.searchProperty(query)
      );
      // this.currentPage = res.data.current_page;
      this.properties = res.data.data;
      // this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  toggleFavorite(id: number) {
    if (this.favoriteIds.has(id)) {
      this.removeFavorites(id);
    } else {
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
    this.getProperties(1);
    this.getFavorites(1);
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
  getImageSrc(path?: string): string {
    if (!path) {
      return 'assets/Imgs/pool.jpg';
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return this.imageUrl + path;
  }
  computePages() {
    const last = Number(this.pagination?.last_page ?? 1);
    const current = Number(this.currentPage ?? 1);
    const maxVisible = 7;

    if (last <= 0) {
      this.pages = [];
      return;
    }

    if (last <= maxVisible) {
      this.pages = Array.from({ length: last }, (_, i) => i + 1);
      return;
    }

    let start = current - 3;
    let end = current + 3;

    if (start < 1) {
      start = 1;
      end = Math.min(maxVisible, last);
    }

    if (end > last) {
      end = last;
      start = Math.max(1, last - (maxVisible - 1));
    }

    const len = end - start + 1;
    this.pages = Array.from({ length: len }, (_, i) => start + i);
  }

  nextPage() {
    if (
      this.pagination?.next_page_url &&
      this.currentPage < this.pagination.last_page
    ) {
      this.getProperties(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.prev_page_url && this.currentPage > 1) {
      this.getProperties(this.currentPage - 1);
    }
  }

  goToPage(page: number) {
    if (page === this.currentPage) return;
    if (page < 1 || page > (this.pagination?.last_page ?? 1)) return;
    this.getProperties(page);
  }
}
