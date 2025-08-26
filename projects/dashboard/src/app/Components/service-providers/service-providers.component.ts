import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdministrationService } from '../../Services/administration.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { PaginatedData } from '../../Models/paginated_data';
import { lastValueFrom } from 'rxjs';
import { adjudicationProperty } from '../../Models/adjudication/adjudicationProperty';
import { adjudicationServiceProviders } from '../../Models/adjudication/adjudicationServiceProvider';
import { pendingServices } from '../../Models/viewServiceAdj/pendingServices';
import { approve_or_decline_service } from '../../Models/viewServiceAdj/approve_or_decline_service';
import { all_services } from '../../Models/viewAllServicesAdj/all_services';
type StatusFilter = 'All' | 'Pending' | 'Approved' | 'Declined';

@Component({
  selector: 'app-service-providers',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './service-providers.component.html',
  styleUrl: './service-providers.component.css',
})
export class ServiceProvidersComponent {
  tabs: StatusFilter[] = ['All', 'Pending', 'Approved', 'Declined'];
  activeFilter: StatusFilter = 'All';
  pending: pendingServices[] = [];
  app: approve_or_decline_service[] = [];
  dec: approve_or_decline_service[] = [];
  all: all_services[] = [];
  adjService: adjudicationServiceProviders = new adjudicationServiceProviders();
  constructor(private router: Router, private srv: AdministrationService) {}
  ngOnInit(): void {
    this.getAll();
  }

  async getPending() {
    try {
      let res: ApiResponse<PaginatedData<pendingServices>> =
        await lastValueFrom(this.srv.viewPendingServiceProviders(1));
      this.pending = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getApproved() {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_service>> =
        await lastValueFrom(this.srv.viewAcceptedServiceProviders(1));
      this.app = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDeclined() {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_service>> =
        await lastValueFrom(this.srv.viewRejectedServiceProviders(1));
      this.dec = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let res: ApiResponse<PaginatedData<all_services>> = await lastValueFrom(
        this.srv.viewAllServiceProviders(1)
      );
      this.all = res.data.data;
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
  async approveOrdecline(id: number, n: number, reason: string) {
    this.adjService.approve = n;
    this.adjService.service_provider_service_id = id;
    // this.adjService.reason = reason;
    try {
      const res = await lastValueFrom(
        this.srv.adjudicationServiceProviders(this.adjService)
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
    this.router.navigate(['/service', id]);
  }
}
