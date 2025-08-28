import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../Models/ApiResponse';
import { Router } from '@angular/router';
import { property_report } from '../../Models/Reports/property_report';
import { ReportsService } from '../../Services/reports.service';
import { lastValueFrom } from 'rxjs';
import { PaginatedData } from '../../Models/paginated_data';
import { service_report } from '../../Models/Reports/service_report';

type TabFilter = 'Properties' | 'Service Provider';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  tabs: TabFilter[] = ['Properties', 'Service Provider'];
  activeFilter: TabFilter = 'Properties';

  propertyReports: property_report[] = [];
  serviceReports: service_report[] = [];
  currentPage: number = 1;
  pagination: any;
  constructor(private router: Router, private srv: ReportsService) {}
  ngOnInit(): void {
    this.getPropertiesReports(1);
  }
  async getPropertiesReports(page: number) {
    try {
      let res: ApiResponse<PaginatedData<property_report>> =
        await lastValueFrom(this.srv.viewPropertiesReports(page, 'pending'));
      this.propertyReports = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getServicesReports(page: number) {
    try {
      let res: ApiResponse<PaginatedData<service_report>> = await lastValueFrom(
        this.srv.viewServicesReports(page, 'pending')
      );
      this.serviceReports = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  setFilter(filter: TabFilter, page: number) {
    this.activeFilter = filter;
    switch (filter) {
      case 'Properties':
        this.getPropertiesReports(page);
        break;
      case 'Service Provider':
        this.getServicesReports(page);
        break;
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.setFilter(this.activeFilter, page);
    }
  }

  getPageRange(): number[] {
    const range: number[] = [];
    const total = this.pagination?.last_page || 1;

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(total - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
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
}
