import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../Models/ApiResponse';
import { propertyDetails } from '../../Models/property-details';
import { PropertyService } from '../../Services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    MessageComponent,
  ],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css',
})
export class HomeDetailsComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  showMessagePopup = false;
  imageToShow: string = '';

  homeIdSRT: string = '';
  homeId: number = 0;
  images: string[] = [];
  imagesUrl: string = 'http://127.0.0.1:8000/';
  details: propertyDetails = new propertyDetails();

  center: google.maps.LatLngLiteral = { lat: 52.3676, lng: 4.9041 };
  markerLatLong: google.maps.LatLngLiteral[] = [
    { lat: 52.3676, lng: 4.9051 },
    { lat: 52.3676, lng: 4.9031 },
  ];

  constructor(
    private route: ActivatedRoute,
    private propertyservice: PropertyService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.homeIdSRT = paramsMap.get('homeID') || '';
      this.homeId = Number(this.homeIdSRT);

      this.viewHomeDetails(this.homeId);
    });
  }
  async viewHomeDetails(homeId: number) {
    try {
      let res: ApiResponse<propertyDetails> = await lastValueFrom(
        this.propertyservice.viewPropertyDetails(homeId)
      );
      this.details = res.data;
      this.images = res.data.images.map(
        (img) => this.imagesUrl + img.image_path
      );
    } catch (error) {
      console.log(error);
    }
  }
  get displayText(): string {
    const name = this.details.residential
      ? this.details.residential.residential_property_type.name
      : this.details.commercial
      ? this.details.commercial.commercial_property_type.name
      : '';

    const action = this.details.purchase
      ? 'For Sale'
      : this.details.rent
      ? 'For Rent'
      : this.details.off_plan
      ? 'Off Plan'
      : '';

    const base = `${name} ${action}`.trim();

    let pricePart: string | number | null = null;
    if (this.details.rent) {
      const r = this.details.rent;
      pricePart =
        r.price != null && r.lease_period_unit
          ? `${r.price}/${r.lease_period_unit}`
          : null;
    } else if (this.details.purchase) {
      pricePart = this.details.purchase.price ?? null;
    } else if (this.details.off_plan) {
      pricePart = this.details.off_plan.overall_payment ?? null;
    }

    return pricePart != null ? `${base} - ${pricePart}` : base;
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
}
