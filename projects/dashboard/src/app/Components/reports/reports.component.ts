import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
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
  imports: [NavbarComponent, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  tabs: TabFilter[] = ['Properties', 'Service Provider'];
  activeFilter: TabFilter = 'Properties';

  propertyReports: property_report[] = [];
  serviceReports: service_report[] = [];

  constructor(private router: Router, private srv: ReportsService) {}
  ngOnInit(): void {
    this.getPropertiesReports();
  }
  async getPropertiesReports() {
    try {
      let res: ApiResponse<PaginatedData<property_report>> =
        await lastValueFrom(this.srv.viewPropertiesReports('pending'));
      this.propertyReports = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getServicesReports() {
    try {
      let res: ApiResponse<PaginatedData<service_report>> = await lastValueFrom(
        this.srv.viewServicesReports('pending')
      );
      this.serviceReports = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  setFilter(filter: TabFilter) {
    this.activeFilter = filter;
    switch (filter) {
      case 'Properties':
        this.getPropertiesReports();
        break;
      case 'Service Provider':
        this.getServicesReports();
        break;
    }
  }
}
