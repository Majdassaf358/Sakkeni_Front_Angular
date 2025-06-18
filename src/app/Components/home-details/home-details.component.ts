import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../Models/ApiResponse';
import { propertyDetails } from '../../Models/property-details';
import { PropertyService } from '../../Services/property.service';

@Component({
  selector: 'app-home-details',
  imports: [NavbarComponent, FiltersComponent],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css',
})
export class HomeDetailsComponent implements OnInit {
  homeIdSRT: string = '';
  homeId: number = 0;
  details: propertyDetails = new propertyDetails();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    } catch (error) {
      console.log(error);
    }
  }
}
