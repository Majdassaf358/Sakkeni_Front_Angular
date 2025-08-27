import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdministrationService } from '../../Services/administration.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { PaginatedData } from '../../Models/paginated_data';
import { pendingReq } from '../../Models/viewPending/pendingReq';
import { lastValueFrom } from 'rxjs';
import { adjudicationProperty } from '../../Models/adjudication/adjudicationProperty';
import { approve_or_decline_property } from '../../Models/approve_or_decline._property';
import { allproperties } from '../../Models/ViewAllPropertiesAdj/allproperties';

type StatusFilter = 'All' | 'Pending' | 'Approved' | 'Declined';
@Component({
  selector: 'app-properties',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
  tabs: StatusFilter[] = ['All', 'Pending', 'Approved', 'Declined'];
  activeFilter: StatusFilter = 'All';
  pendings: pendingReq[] = [];
  app: approve_or_decline_property[] = [];
  dec: approve_or_decline_property[] = [];
  all: allproperties[] = [];
  adjProperty: adjudicationProperty = new adjudicationProperty();
  currentPage: number = 1;
  pagination: any;
  constructor(private router: Router, private srv: AdministrationService) {}
  ngOnInit(): void {
    this.getAll(1);
  }

  async getPending(page: number) {
    try {
      let res: ApiResponse<PaginatedData<pendingReq>> = await lastValueFrom(
        this.srv.viewPendingProperties(page)
      );
      this.pendings = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getApproved(page: number) {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_property>> =
        await lastValueFrom(this.srv.viewApprovedProperties(page));
      this.app = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDeclined(page: number) {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_property>> =
        await lastValueFrom(this.srv.viewDeclinedProperties(page));
      this.dec = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll(page: number) {
    try {
      let res: ApiResponse<PaginatedData<allproperties>> = await lastValueFrom(
        this.srv.viewAllProperties(page)
      );
      this.all = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
      console.log(this.all);
    } catch (error) {
      console.log(error);
    }
  }
  setFilter(filter: StatusFilter, page: number) {
    this.activeFilter = filter;

    switch (filter) {
      case 'Pending':
        this.getPending(page);
        break;
      case 'Approved':
        this.getApproved(page);
        break;
      case 'Declined':
        this.getDeclined(page);
        break;
      case 'All':
        this.getAll(page);
        break;
    }
  }
  async approveOrdecline(id: number, adj: number, reason: string) {
    this.adjProperty.approve = adj;
    this.adjProperty.property_id = id;
    // this.adjProperty.reason = reason;
    try {
      const res = await lastValueFrom(
        this.srv.adjudicationProperties(this.adjProperty)
      );
      this.getPending(this.currentPage);
    } catch (error) {
      console.log(error);
    }
  }
  get topStatusLabel(): string {
    return this.activeFilter;
  }

  get topStatusClass(): string[] {
    return ['top_status', this.activeFilter.toLowerCase()];
  }
  goTo(id: number) {
    this.router.navigate(['/property', id]);
  }
  // Add inside PropertiesComponent
  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.setFilter(this.activeFilter, page); // uses the helper we wrote earlier
    }
  }

  // Creates an array of page numbers around the currentPage
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
