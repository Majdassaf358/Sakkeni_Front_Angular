import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-about-us',
  imports: [NavbarComponent, CommonModule, GoogleMapsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  // center: google.maps.LatLngLiteral = { lat: 34.8021, lng: 38.9968 };
  // markers: { position: google.maps.LatLngLiteral; title: string }[] = [];
  // syriaPolygonCoords = [
  //   { lat: 32.0, lng: 36.8 },
  //   { lat: 32.6, lng: 38.5 },
  //   { lat: 33.2, lng: 39.2 },
  //   { lat: 34.0, lng: 39.0 },
  //   { lat: 35.0, lng: 40.0 },
  //   { lat: 36.2, lng: 41.0 },
  //   { lat: 37.0, lng: 40.5 },
  //   { lat: 37.3, lng: 38.0 },
  //   { lat: 36.8, lng: 36.7 },
  //   { lat: 35.7, lng: 35.8 },
  //   { lat: 34.5, lng: 35.7 },
  //   { lat: 33.3, lng: 36.2 },
  //   { lat: 32.7, lng: 36.0 },
  //   { lat: 32.0, lng: 36.8 }, // close the polygon
  // ];
  // syriaPolygon: google.maps.Polygon = new google.maps.Polygon();
  // ngOnInit() {
  //   this.syriaPolygon = new google.maps.Polygon({
  //     paths: this.syriaPolygonCoords,
  //   });
  // }
  // onMapClick(event: google.maps.MapMouseEvent): void {
  //   if (event.latLng) {
  //     const latLng = event.latLng;
  //     const isInsideSyria = google.maps.geometry.poly.containsLocation(
  //       latLng,
  //       this.syriaPolygon
  //     );
  //     if (isInsideSyria) {
  //       const position = latLng.toJSON();
  //       console.log('Clicked position:', position);
  //       this.markers.push({
  //         position,
  //         title: `Marker at (${position.lat}, ${position.lng})`,
  //       });
  //     } else {
  //       console.log('Only locations in Syria are allowed.');
  //     }
  //   }
  // }
}
