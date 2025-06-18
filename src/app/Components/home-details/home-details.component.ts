import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../Models/ApiResponse';
import { propertyDetails } from '../../Models/property-details';
import { PropertyService } from '../../Services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [NavbarComponent, FiltersComponent, CommonModule, FormsModule],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css',
})
export class HomeDetailsComponent implements OnInit {
  homeIdSRT: string = '';
  homeId: number = 0;
  images: string[] = [];
  imagesUrl: string = 'http://127.0.0.1:8000/';
  details: propertyDetails = new propertyDetails();
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
  openGallery() {
    // You can open a modal/lightbox or route to another page
    console.log('Open full gallery');
  }
}
