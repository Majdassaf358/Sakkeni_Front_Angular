import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { propertyCard } from '../../Models/property-card';
import { PaginatedData } from '../../Models/paginatedData';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { PropertyService } from '../../Services/property.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [NavbarComponent, FiltersComponent, CommonModule, FormsModule],
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
})
export class HomesComponent implements OnInit {
  sideFilter: string = 'list';
  currentPage: number = 1;
  properties: propertyCard[] = [];
  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  ngOnInit(): void {
    this.getProperties();
  }
  async getProperties() {
    try {
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.propertyservice.viewProperty()
      );
      this.currentPage = res.data.current_page;
      this.properties = res.data.data;
      console.log(this.properties);
    } catch (error) {
      console.log(error);
    }
  }
  updateSideFilter(Value: string) {
    this.sideFilter = Value;
  }
  goToDetails() {
    this.router.navigate(['/homes-details']);
  }
}
