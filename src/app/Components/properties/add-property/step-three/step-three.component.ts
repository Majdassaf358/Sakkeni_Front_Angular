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
  center: google.maps.LatLngLiteral = {
    lat: 33.42565943762839,
    lng: 36.94301086943456,
  };
  marker: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
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

  ngOnInit(): void {
    // any initialization if needed
  }

  get displayText(): string {
    const basic = this.form.get('stepTwo.basic')!.value;
    const extended = this.form.get('stepTwo.extended')!.value;

    const typeName = basic.propertyType;
    let action = '';
    if (basic.sellType === 'rent') action = 'For Rent';
    else if (basic.sellType === 'purchase') action = 'For Sale';
    else if (basic.sellType === 'off_plan') action = 'Off Plan';

    // price part
    let pricePart: string | number = '';
    if (basic.sellType === 'rent') {
      pricePart = extended.rent.price;
    } else if (basic.sellType === 'purchase') {
      pricePart = extended.purchase.price;
    } else if (basic.sellType === 'off_plan') {
      pricePart = extended.off_plan.overall_payment;
    }

    return `${typeName} ${action} - ${pricePart}`;
  }

  // helper for image URLs
  get images(): string[] {
    return this.form.get('stepOne.images')!.value;
  }

  // getters for basic and extended
  get basic() {
    return this.form.get('stepTwo.basic')!.value;
  }

  get extended() {
    return this.form.get('stepTwo.extended')!.value;
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
