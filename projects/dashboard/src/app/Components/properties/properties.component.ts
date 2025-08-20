import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdministrationService } from '../../Services/administration.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { PaginatedData } from '../../Models/paginated_data';
import { pendingReq } from '../../Models/viewPending/pendingReq';
import { lastValueFrom } from 'rxjs';
import { adjudicationProperty } from '../../Models/adjudication/adjudicationProperty';

type StatusFilter = 'All' | 'Pending' | 'Approved' | 'Declined';
@Component({
  selector: 'app-properties',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent {
  tabs: StatusFilter[] = ['All', 'Pending', 'Approved', 'Declined'];
  activeFilter: StatusFilter = 'All';
  pendings: pendingReq[] = [];
  adjProperty!: adjudicationProperty;
  constructor(private router: Router, private srv: AdministrationService) {}
  ngOnInit(): void {
    this.getPending();
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
  setFilter(filter: StatusFilter) {
    this.activeFilter = filter;
  }
  async approveOrdecline(id: number, n: number, reason: string) {
    this.adjProperty.approve = n;
    this.adjProperty.property_id = id;
    this.adjProperty.reason = reason;
    try {
      const res = await lastValueFrom(
        this.srv.adjudicationProperties(this.adjProperty)
      );
      // this.favourite_property = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async addToFavorites(id: number) {}
  decline(id: number) {
    // this.activeFilter = filter;
  }
  get topStatusLabel(): string {
    return this.activeFilter;
  }

  get topStatusClass(): string[] {
    return ['top_status', this.activeFilter.toLowerCase()];
  }
}
