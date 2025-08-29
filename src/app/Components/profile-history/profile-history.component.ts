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
type StatusFilter = 'All' | 'Pending' | 'Sold';
@Component({
  selector: 'app-profile-history',
  imports: [NavbarComponent, CommonModule, FormsModule, GoogleMapsModule],
  templateUrl: './profile-history.component.html',
  styleUrl: './profile-history.component.css',
})
export class ProfileHistoryComponent implements OnInit {
  tabs: StatusFilter[] = ['All', 'Pending', 'Sold'];
  activeFilter: StatusFilter = 'All';
  profileHistory: propertyCard[] = [];
  type: string = 'rent';
  page: number = 1;
  currentPage: number = 1;
  pagination: any;
  imageUrl: string = 'http://127.0.0.1:8000/';

  constructor(private srv: PropertyService, private router: Router) {}
  ngOnInit(): void {
    this.getAll(1);
  }
  async getAll(page: number) {
    try {
      let res = await lastValueFrom(this.srv.viewMyProperties('rent ', page));
      this.profileHistory = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  setFilter(filter: StatusFilter, page: number) {
    this.activeFilter = filter;
    this.getAll(page);
  }

  goTo(id: number) {
    this.router.navigate(['/property', id]);
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.setFilter(this.activeFilter, page);
    }
  }

  nextPage() {
    if (this.pagination?.next_page_url) {
      this.setFilter(this.activeFilter, this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.prev_page_url) {
      this.setFilter(this.activeFilter, this.currentPage - 1);
    }
  }

  getPageRange(): number[] {
    const total = this.pagination?.last_page || 1;
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  getImageSrc(path?: string): string {
    if (!path) {
      return 'assets/Imgs/pool.jpg';
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return this.imageUrl + path;
  }
}
