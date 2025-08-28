import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filters } from '../../Models/filters';
import { ProjectIdsService } from '../../Services/project-ids.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { country_cities } from '../../Models/get_ids/country_cities';
import { lastValueFrom } from 'rxjs';
import { id_name } from '../../Models/get_ids/id_name';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent implements OnInit {
  @Input() selectedType: string = 'rent';
  @Output() filtersApplied = new EventEmitter<filters>();
  @Output() popupClosed = new EventEmitter<void>();
  selectedPropertyType: string = '';
  filterValues: filters = new filters();
  private amenitySet = new Set<number>();
  amenities: id_name[] = [];
  countryCities: country_cities[] = [];
  displayedCountries: country_cities[] = [];
  displayedCities: { id: number; name: string }[] = [];
  countriesLoaded = false;
  popupMessage: string = '';

  constructor(private helpsrv: ProjectIdsService) {}
  ngOnInit(): void {
    this.loadCitiesForCountry();
    this.getAmenities();
  }
  async getAmenities() {
    try {
      let res: ApiResponse<id_name[]> = await lastValueFrom(
        this.helpsrv.getAmenities()
      );
      this.amenities = res.data;
    } catch (err) {
      console.log(err);
    }
  }
  async loadCitiesForCountry() {
    try {
      let res: ApiResponse<country_cities[]> = await lastValueFrom(
        this.helpsrv.getCountries()
      );
      this.countryCities = res.data;
      this.displayedCountries = this.countryCities.slice();
    } catch (err) {
      console.log(err);
    } finally {
      this.countriesLoaded = true;

      const initialId =
        this.filterValues.country_id ?? this.displayedCountries[0]?.id ?? null;
      if (initialId) {
        this.setCountry(initialId);
      } else {
        this.displayedCities = [];
      }
    }
  }
  setCountry(countryId: number) {
    this.filterValues.country_id = countryId;
    const country = this.countryCities.find((c) => c.id === countryId);
    this.displayedCities = (country?.cities ?? []).map((city) => ({
      id: city.id,
      name: city.name,
    }));
    this.filterValues.city_id = 1;
  }

  onCountrySelectChange(newId: number) {
    this.setCountry(newId);
  }

  trackById(_: number, item: { id: number }) {
    return item.id;
  }
  applyFilters() {
    this.filterValues.amenity_ids = Array.from(this.amenitySet);
    this.filtersApplied.emit(this.filterValues);
    this.closePopup();
  }

  toggleAmenity(id: number) {
    if (this.amenitySet.has(id)) {
      this.amenitySet.delete(id);
    } else {
      this.amenitySet.add(id);
    }
  }

  closePopup() {
    this.popupClosed.emit();
  }
}
