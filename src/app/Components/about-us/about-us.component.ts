import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [NavbarComponent, GoogleMapsModule, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  center: google.maps.LatLngLiteral = { lat: 52.3676, lng: 4.9041 };
  markerLatLong: google.maps.LatLngLiteral[] = [
    { lat: 52.3676, lng: 5.9041 },
    { lat: 52.3676, lng: 6.9041 },
  ];
}
