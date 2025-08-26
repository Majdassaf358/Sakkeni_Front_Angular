import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { PaginatedData } from '../Models/paginated_data';
import { pendingReq } from '../Models/viewPending/pendingReq';
import { environment } from '../shared/environments';
import { adjudicationProperty } from '../Models/adjudication/adjudicationProperty';
import { adjudicationServiceProviders } from '../Models/adjudication/adjudicationServiceProvider';
import { approve_or_decline_property } from '../Models/approve_or_decline._property';
import { pendingServices } from '../Models/viewServiceAdj/pendingServices';
import { propertyDetails } from '../Models/viewproperty/property-details';
import { approve_or_decline_service } from '../Models/viewServiceAdj/approve_or_decline_service';
import { allproperties } from '../Models/ViewAllPropertiesAdj/allproperties';
import { all_services } from '../Models/viewAllServicesAdj/all_services';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {}

  public viewPendingProperties(
    page: number
  ): Observable<ApiResponse<PaginatedData<pendingReq>>> {
    let url = `${environment.Api}/admin/view-pending-properties?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<pendingReq>>>(url);
  }
  public viewApprovedProperties(
    page: number
  ): Observable<ApiResponse<PaginatedData<approve_or_decline_property>>> {
    let url = `${environment.Api}/admin/view-latest-accepted-properties?page=${page}`;
    return this.http.get<
      ApiResponse<PaginatedData<approve_or_decline_property>>
    >(url);
  }
  public viewDeclinedProperties(
    page: number
  ): Observable<ApiResponse<PaginatedData<approve_or_decline_property>>> {
    let url = `${environment.Api}/admin/view-latest-rejected-properties?page=${page}`;
    return this.http.get<
      ApiResponse<PaginatedData<approve_or_decline_property>>
    >(url);
  }
  public viewAllProperties(
    page: number
  ): Observable<ApiResponse<PaginatedData<allproperties>>> {
    let url = `${environment.Api}/admin/view-latest-properties-adjudication?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<allproperties>>>(url);
  }
  public viewPropertyDetails(
    homeId: number
  ): Observable<ApiResponse<propertyDetails>> {
    let url = `${environment.Api}/view-property-details/${homeId}`;
    return this.http.get<ApiResponse<propertyDetails>>(url);
  }
  public adjudicationProperties(
    req: adjudicationProperty
  ): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/admin/property-adjudication`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
  public viewPendingServiceProviders(
    page: number
  ): Observable<ApiResponse<PaginatedData<pendingServices>>> {
    let url = `${environment.Api}/admin/view-pending-service-providers?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<pendingServices>>>(url);
  }
  public viewAcceptedServiceProviders(
    page: number
  ): Observable<ApiResponse<PaginatedData<approve_or_decline_service>>> {
    let url = `${environment.Api}/admin/view-latest-accepted-service-providers?page=${page}`;
    return this.http.get<
      ApiResponse<PaginatedData<approve_or_decline_service>>
    >(url);
  }
  public viewRejectedServiceProviders(
    page: number
  ): Observable<ApiResponse<PaginatedData<approve_or_decline_service>>> {
    let url = `${environment.Api}/admin/view-latest-rejected-service-providers?page=${page}`;
    return this.http.get<
      ApiResponse<PaginatedData<approve_or_decline_service>>
    >(url);
  }
  public viewAllServiceProviders(
    page: number
  ): Observable<ApiResponse<PaginatedData<all_services>>> {
    let url = `${environment.Api}/admin/view-latest-service-providers-adjudication?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<all_services>>>(url);
  }
  public adjudicationServiceProviders(
    req: adjudicationServiceProviders
  ): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/admin/service-provider-service-adjudication`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
}
