import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../shared/environments';
import { total_users } from '../Models/charts/total_users';
import { total_properties } from '../Models/charts/total_properties';
import { properties_status } from '../Models/charts/properties_status';
import { services_status } from '../Models/charts/services_status';
import { Properties_locations } from '../Models/charts/properties_locations';
import { logs } from '../Models/activity-logs/logs';
import { PaginatedData } from '../Models/paginated_data';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}
  public getTotalUsers(): Observable<ApiResponse<total_users>> {
    let url = `${environment.Api}/admin/charts/total-users`;
    return this.http.get<ApiResponse<total_users>>(url);
  }
  public getTotalProperties(): Observable<ApiResponse<total_properties>> {
    let url = `${environment.Api}/admin/charts/total-properties`;
    return this.http.get<ApiResponse<total_properties>>(url);
  }
  public getPropertyStatus(): Observable<ApiResponse<properties_status>> {
    let url = `${environment.Api}/admin/charts/properties-status`;
    return this.http.get<ApiResponse<properties_status>>(url);
  }
  public getServiceStatus(): Observable<ApiResponse<services_status>> {
    let url = `${environment.Api}/admin/charts/services-status`;
    return this.http.get<ApiResponse<services_status>>(url);
  }
  public getActivityLogs(
    page: number
  ): Observable<ApiResponse<PaginatedData<logs>>> {
    let url = `${environment.Api}/admin/view-log?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<logs>>>(url);
  }
  public getPropertiesLocations(): Observable<
    ApiResponse<Properties_locations>
  > {
    let url = `${environment.Api}/admin/charts/properties-locations`;
    return this.http.get<ApiResponse<Properties_locations>>(url);
  }
}
