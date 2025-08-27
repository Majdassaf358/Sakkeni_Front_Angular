import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { propertyDetails } from '../../Models/viewproperty/property-details';
import { lastValueFrom } from 'rxjs';
import { AdministrationService } from '../../Services/administration.service';
// import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-property',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css',
})
export class ViewPropertyComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  // @ViewChild(GoogleMap) map!: GoogleMap;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  showMessagePopup = false;
  imageToShow: string = '';
  propertyIDSRT: string = '';
  propertyID: number = 0;
  images: string[] = [];
  imagesUrl: string = 'http://127.0.0.1:8000/';
  details: propertyDetails = new propertyDetails();

  // center: google.maps.LatLngLiteral = {
  //   lat: 33.42565943762839,
  //   lng: 36.94301086943456,
  // };
  // marker: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  // mapOptions: google.maps.MapOptions = {
  //   center: this.center,
  //   zoom: 12,
  //   mapTypeId: google.maps.MapTypeId.SATELLITE,
  //   mapTypeControl: true,
  //   mapTypeControlOptions: {
  //     style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
  //     position: google.maps.ControlPosition.TOP_RIGHT,
  //     mapTypeIds: [
  //       google.maps.MapTypeId.ROADMAP,
  //       google.maps.MapTypeId.SATELLITE,
  //       google.maps.MapTypeId.HYBRID,
  //       google.maps.MapTypeId.TERRAIN,
  //     ],
  //   },
  // };
  constructor(
    private route: ActivatedRoute,
    private srv: AdministrationService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.propertyIDSRT = paramsMap.get('Pid') || '';
      this.propertyID = Number(this.propertyIDSRT);

      this.viewProperty(this.propertyID);
    });
  }
  async viewProperty(id: number) {
    try {
      let res: ApiResponse<propertyDetails> = await lastValueFrom(
        this.srv.viewPropertyDetails(id)
      );
      this.details = res.data;
      this.images = res.data.images.map((img) => img.image_path);
      // this.center.lat = this.details.location.latitude;
      // this.center.lng = this.details.location.longitude;
      // this.marker.lat = this.details.location.latitude;
      // this.marker.lng = this.details.location.longitude;
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
  // toggleSatellite(on: boolean) {
  //   this.map.googleMap?.setMapTypeId(
  //     on ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP
  //   );
  // }
}
