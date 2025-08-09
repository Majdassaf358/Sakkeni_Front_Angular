import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { country_cities } from '../Models/get_ids/country_cities';
import { environment } from '../shared/environments';
import { HttpClient } from '@angular/common/http';
import { id_name } from '../Models/get_ids/id_name';

@Injectable({
  providedIn: 'root',
})
export class ProjectIdsService {
  constructor(private http: HttpClient) {}
  public getCountries(): Observable<ApiResponse<country_cities[]>> {
    let url = `${environment.Api}/view-countries`;
    return this.http.get<ApiResponse<country_cities[]>>(url);
  }
  public getAmenities(): Observable<ApiResponse<id_name[]>> {
    let url = `${environment.Api}/view-amenities`;
    return this.http.get<ApiResponse<id_name[]>>(url);
  }
  public getPropertyTypes(): Observable<ApiResponse<id_name>> {
    let url = `${environment.Api}/view-property-types`;
    return this.http.get<ApiResponse<id_name>>(url);
  }
  public getCommercialPropertyTypes(): Observable<ApiResponse<id_name>> {
    let url = `${environment.Api}/view-commercial-property-types`;
    return this.http.get<ApiResponse<id_name>>(url);
  }
  public getResidentialPropertyTypes(): Observable<ApiResponse<id_name>> {
    let url = `${environment.Api}/view-residential-property-types`;
    return this.http.get<ApiResponse<id_name>>(url);
  }
  public getDirections(): Observable<ApiResponse<id_name>> {
    let url = `${environment.Api}/view-directions`;
    return this.http.get<ApiResponse<id_name>>(url);
  }
  public getAvailabilityStatus(): Observable<ApiResponse<id_name>> {
    let url = `${environment.Api}/view-availability-status`;
    return this.http.get<ApiResponse<id_name>>(url);
  }
  public getOwnershipTypes(): Observable<ApiResponse<id_name>> {
    let url = `${environment.Api}/view-ownership-types`;
    return this.http.get<ApiResponse<id_name>>(url);
  }
}
