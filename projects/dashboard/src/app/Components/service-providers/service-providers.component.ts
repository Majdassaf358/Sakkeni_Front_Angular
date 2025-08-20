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
import { pendingServices } from '../../Models/viewPending/pendingServices';
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
  service: pendingServices[] = [];
  adjService!: adjudicationServiceProviders;
  constructor(private router: Router, private srv: AdministrationService) {}
  ngOnInit(): void {
    this.getServices();
  }

  async getServices() {
    // try {
    //   let res: ApiResponse<PaginatedData<pendingReq>> = await lastValueFrom(
    //     this.srv.viewPendingProperties(1)
    //   );
    //   this.pendings = res.data.data;
    // } catch (error) {
    //   console.log(error);
    // }
  }
  setFilter(filter: StatusFilter) {
    this.activeFilter = filter;
  }
  async approveOrdecline(id: number, n: number, reason: string) {
    this.adjService.approve = n;
    this.adjService.service_provider_service_id = id;
    this.adjService.reason = reason;
    try {
      const res = await lastValueFrom(
        this.srv.adjudicationServiceProviders(this.adjService)
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
