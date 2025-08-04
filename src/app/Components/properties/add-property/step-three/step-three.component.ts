import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddPropertyService } from '../../../../Services/add-property.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-step-three',
  imports: [CommonModule, FormsModule, GoogleMapsModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  form: FormGroup;

  propertyTypes = [
    { id: 1, name: 'apartment' },
    { id: 2, name: 'villa' },
    { id: 3, name: 'office' },
  ];

  sellTypes = [
    { id: 1, name: 'rent' },
    { id: 2, name: 'purchase' },
    { id: 3, name: 'off_plan' },
  ];
  countries: { id: number; name: string }[] = [{ id: 1, name: 'Syria' }];
  cities: { id: number; name: string }[] = [
    { id: 1, name: 'Damascus' },
    { id: 2, name: 'Aleppo' },
    { id: 3, name: 'Homs' },
  ];
  exposures: { id: number; name: string }[] = [
    { id: 1, name: 'North' },
    { id: 2, name: 'South' },
    { id: 3, name: 'East' },
    { id: 4, name: 'West' },
    { id: 5, name: 'North‑East' },
    { id: 6, name: 'North‑West' },
    { id: 7, name: 'South‑East' },
    { id: 8, name: 'South‑West' },
  ];
  amenities: { id: number; name: string }[] = [
    { id: 1, name: 'Rerum' },
    { id: 2, name: 'Id' },
    { id: 3, name: 'Voluptatem' },
    { id: 4, name: 'Laudantium' },
    { id: 5, name: 'Sunt' },
    { id: 6, name: 'Blanditiis' },
    { id: 7, name: 'Assumenda' },
    { id: 8, name: 'Recusandae' },
    { id: 9, name: 'Vel' },
    { id: 10, name: 'Repudiandae' },
  ];
  ownership_type_id: { id: number; name: string }[] = [
    { id: 1, name: 'Freehold' },
  ];
  center: google.maps.LatLngLiteral = {
    lat: 33.42565943762839,
    lng: 36.94301086943456,
  };

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT,
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        google.maps.MapTypeId.HYBRID,
        google.maps.MapTypeId.TERRAIN,
      ],
    },
  };
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  showMessagePopup = false;
  imageToShow: string = '';
  constructor(private formSvc: AddPropertyService) {
    this.form = this.formSvc.getForm();
  }

  ngOnInit(): void {}

  get displayText(): string {
    const basic = this.form.get('stepTwo.basic')!.value;
    const extended = this.form.get('stepTwo.extended')!.value;

    const typeName =
      this.propertyTypes.find((t) => t.id === basic.propertyType)?.name || '';
    let action = '';

    switch (basic.sellType) {
      case 1:
        action = 'For Rent';
        break;
      case 2:
        action = 'For Sale';
        break;
      case 3:
        action = 'Off Plan';
        break;
    }

    let pricePart: string | number = '';
    switch (basic.sellType) {
      case 1:
        pricePart = extended.rent.price;
        break;
      case 2:
        pricePart = extended.purchase.price;
        break;
      case 3:
        pricePart = extended.off_plan.overall_payment;
        break;
    }

    return `${typeName} ${action} - ${pricePart}`;
  }
  get marker(): google.maps.LatLngLiteral {
    const lat = this.form.get('stepTwo.basic.latitude')?.value;
    const lng = this.form.get('stepTwo.basic.longitude')?.value;
    this.center = { lat: lat, lng: lng };

    return {
      lat: lat,
      lng: lng,
    };
  }
  get images(): string[] {
    return this.form.get('stepOne.images')?.value;
  }

  get basic() {
    return this.form.get('stepTwo.basic')?.value;
  }

  get extended() {
    return this.form.get('stepTwo.extended')?.value;
  }
  getCountryName(id: number): string {
    return this.countries.find((c) => c.id === +id)?.name || '';
  }

  getCityName(id: number | string): string {
    return this.cities.find((c) => c.id === +id)?.name || '';
  }

  getDirectionNames(ids: number[] | undefined): string[] {
    if (!ids || !Array.isArray(ids)) {
      return [];
    }
    return this.exposures.filter((d) => ids.includes(d.id)).map((d) => d.name);
  }

  getAmenityNames(ids: number[]): string[] {
    if (!ids || !Array.isArray(ids)) {
      return [];
    }
    return this.amenities.filter((a) => ids.includes(a.id)).map((a) => a.name);
  }

  getOwnershipNames(ids: number[]): string[] {
    return this.ownership_type_id
      .filter((o) => ids.includes(o.id))
      .map((o) => o.name);
  }

  openPopup(img: string) {
    this.imageToShow = img;
    this.showMessagePopup = true;
  }
  onPopupClosed() {
    this.showMessagePopup = false;
  }
  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.scrollContainer.nativeElement.classList.add('dragging');
    this.startX = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
  }

  stopDrag(): void {
    this.isDragging = false;
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.classList.remove('dragging');
    }
  }

  onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
  toggleSatellite(on: boolean) {
    this.map.googleMap?.setMapTypeId(
      on ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP
    );
  }
}
