import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { propertyCard } from '../../Models/property-card';
import { PropertyService } from '../../Services/property.service';
import { PaginatedData } from '../../Models/paginatedData';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-profile-history',
  imports: [NavbarComponent, CommonModule, FormsModule, GoogleMapsModule],
  templateUrl: './profile-history.component.html',
  styleUrl: './profile-history.component.css',
})
export class ProfileHistoryComponent implements OnInit {
  profileHistory: propertyCard[] = [];
  type: string = 'rent';
  page: number = 1;

  constructor(private srv: PropertyService, private router: Router) {}
  ngOnInit(): void {
    this.getHistory();
  }
  async getHistory() {
    try {
      let res: ApiResponse<PaginatedData<propertyCard>> = await lastValueFrom(
        this.srv.viewMyProperties(this.type, this.page)
      );
      this.page = res.data.current_page;
      this.profileHistory = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
