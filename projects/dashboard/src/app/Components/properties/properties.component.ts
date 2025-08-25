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
  constructor(private router: Router, private srv: AdministrationService) {}
  ngOnInit(): void {
    this.getAll();
  }

  async getPending() {
    try {
      let res: ApiResponse<PaginatedData<pendingReq>> = await lastValueFrom(
        this.srv.viewPendingProperties(1)
      );
      this.pendings = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getApproved() {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_property>> =
        await lastValueFrom(this.srv.viewApprovedProperties(1));
      this.app = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDeclined() {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_property>> =
        await lastValueFrom(this.srv.viewDeclinedProperties(1));
      this.dec = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let res: ApiResponse<PaginatedData<allproperties>> = await lastValueFrom(
        this.srv.viewAllProperties(1)
      );
      this.all = res.data.data;
      console.log(this.all);
    } catch (error) {
      console.log(error);
    }
  }
  setFilter(filter: StatusFilter) {
    this.activeFilter = filter;

    switch (filter) {
      case 'Pending':
        this.getPending();
        break;
      case 'Approved':
        this.getApproved();
        break;
      case 'Declined':
        this.getDeclined();
        break;
      case 'All':
        this.getAll();
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
      this.getPending();
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
}
