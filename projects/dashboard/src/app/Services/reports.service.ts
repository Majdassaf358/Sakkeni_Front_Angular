import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { PaginatedData } from '../Models/paginated_data';
import { property_report } from '../Models/Reports/property_report';
import { environment } from '../shared/environments';
import { service_report } from '../Models/Reports/service_report';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}
  public viewPropertiesReports(
    page: number,
    type: string
  ): Observable<ApiResponse<PaginatedData<property_report>>> {
    let url = `${environment.Api}/admin/reports/properties/${type}${page}`;
    return this.http.get<ApiResponse<PaginatedData<property_report>>>(url);
  }
  public viewServicesReports(
    page: number,
    type: string
  ): Observable<ApiResponse<PaginatedData<service_report>>> {
    let url = `${environment.Api}/admin/reports/service-providers/${type}${page}`;
    return this.http.get<ApiResponse<PaginatedData<service_report>>>(url);
  }
  public processReports(
    status: string,
    admin_notes: string
  ): Observable<ApiResponse<PaginatedData<null>>> {
    let url = `${environment.Api}/admin/reports/service-providers/dissmised`;
    return this.http.post<ApiResponse<PaginatedData<null>>>(url, status);
  }
}
