import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { PaginatedData } from '../Models/paginated_data';
import { pendingReq } from '../Models/viewPending/pendingReq';
import { environment } from '../shared/environments';
import { adjudicationProperty } from '../Models/adjudication/adjudicationProperty';
import { adjudicationServiceProviders } from '../Models/adjudication/adjudicationServiceProvider';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {}

  public viewPendingProperties(
    page: number
  ): Observable<ApiResponse<PaginatedData<pendingReq>>> {
    let url = `${environment.Api}/view-pending-properties?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<pendingReq>>>(url);
  }
  public adjudicationProperties(
    req: adjudicationProperty
  ): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/property-adjudication`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
  public viewPendingServiceProviders(
    page: number
  ): Observable<ApiResponse<PaginatedData<pendingReq>>> {
    let url = `${environment.Api}/view-pending-service-providers?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<pendingReq>>>(url);
  }
  public adjudicationServiceProviders(
    req: adjudicationServiceProviders
  ): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/service-provider-service-adjudication`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
}
