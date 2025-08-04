import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../shared/environments';
import { propertyCard } from '../Models/property-card';
import { PaginatedData } from '../Models/paginatedData';
import { addProperty } from '../Models/addProperty';
import { filters } from '../Models/filters';
import { propertyDetails } from '../Models/property-details';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  public viewProperty(
    type: string,
    page: number
  ): Observable<ApiResponse<PaginatedData<propertyCard>>> {
    let url = `${environment.Api}/view-properties/${type}?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<propertyCard>>>(url);
  }
  public viewPropertyDetails(
    homeId: number
  ): Observable<ApiResponse<propertyDetails>> {
    let url = `${environment.Api}/view-property-details/${homeId}`;
    return this.http.get<ApiResponse<propertyDetails>>(url);
  }
  public filterProperty(
    type: string,
    page: number,
    filters: filters
  ): Observable<ApiResponse<PaginatedData<propertyCard>>> {
    let url = `${environment.Api}/view-properties/${type}?page=${page}`;
    return this.http.post<ApiResponse<PaginatedData<propertyCard>>>(
      url,
      filters
    );
  }
}
