import { Component } from '@angular/core';
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
  imports: [CommonModule],
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
  currentPage: number = 1;
  pagination: any;
  constructor(private router: Router, private srv: AdministrationService) {}
  ngOnInit(): void {
    this.getAll(1);
  }

  async getPending(page: number) {
    try {
      let res: ApiResponse<PaginatedData<pendingServices>> =
        await lastValueFrom(this.srv.viewPendingServiceProviders(page));
      this.pending = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getApproved(page: number) {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_service>> =
        await lastValueFrom(this.srv.viewAcceptedServiceProviders(page));
      this.app = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDeclined(page: number) {
    try {
      let res: ApiResponse<PaginatedData<approve_or_decline_service>> =
        await lastValueFrom(this.srv.viewRejectedServiceProviders(page));
      this.dec = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll(page: number) {
    try {
      let res: ApiResponse<PaginatedData<all_services>> = await lastValueFrom(
        this.srv.viewAllServiceProviders(page)
      );
      this.all = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
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
  async approveOrdecline(id: number, n: number, reason: string) {
    this.adjService.approve = n;
    this.adjService.service_provider_service_id = id;
    // this.adjService.reason = reason;
    try {
      const res = await lastValueFrom(
        this.srv.adjudicationServiceProviders(this.adjService)
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
    this.router.navigate(['/service', id]);
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
