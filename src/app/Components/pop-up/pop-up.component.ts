import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filters } from '../../Models/filters';
import { ProjectIdsService } from '../../Services/project-ids.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { country_cities } from '../../Models/get_ids/country_cities';
import { lastValueFrom } from 'rxjs';
import { id_name } from '../../Models/get_ids/id_name';
import { report_property } from '../../Models/Report/report_property';
import { id_reason } from '../../Models/get_ids/id_reason';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent implements OnInit {
  @Input() selectedType: string = 'rent';
  @Input() page: string = 'details';
  @Output() filtersApplied = new EventEmitter<filters>();
  @Output() popupClosed = new EventEmitter<void>();
  @Output() reportSubmitted = new EventEmitter<report_property>();
  selectedPropertyType: string = '';
  filterValues: filters = new filters();
  private amenitySet = new Set<number>();
  amenities: id_name[] = [];
  report_reasons: id_reason[] = [];
  countryCities: country_cities[] = [];
  displayedCountries: country_cities[] = [];
  displayedCities: { id: number; name: string }[] = [];
  countriesLoaded = false;
  popupMessage: string = '';
  selectedReportReason: number = 0;
  report: report_property = new report_property();
  step: 1 | 2 = 1;
  constructor(private helpsrv: ProjectIdsService) {}
  ngOnInit(): void {
    this.loadCitiesForCountry();
    this.getReasons();
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
  async getReasons() {
    try {
      let res: ApiResponse<id_reason[]> = await lastValueFrom(
        this.helpsrv.getPropertiesReportReasons()
      );
      this.report_reasons = res.data;
      console.log(this.report_reasons);
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
  goToStep2() {
    if (!this.selectedReportReason) return;
    this.step = 2;
  }

  toggleAmenity(id: number) {
    if (this.amenitySet.has(id)) {
      this.amenitySet.delete(id);
    } else {
      this.amenitySet.add(id);
    }
  }
  selectReportReason(id: number) {
    this.selectedReportReason = id;
    this.report.report_reason_id = id;
  }

  closePopup() {
    this.step = 1;
    this.selectedReportReason = 0;
    this.report = new report_property();
    this.popupClosed.emit();
  }

  submitReport() {
    if (!this.report.iadditional_commentsd) {
      this.report.iadditional_commentsd = '';
    }
    this.reportSubmitted.emit(this.report);
    this.closePopup();
  }
}
