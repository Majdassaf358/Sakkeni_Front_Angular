import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../shared/environments';
import { propertyCard } from '../Models/property-card';
import { PaginatedData } from '../Models/paginatedData';
import { addProperty } from '../Models/addProperty';
import { filters } from '../Models/filters';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  public viewProperty(
    type: string = 'purchase',
    page: number = 1
  ): Observable<ApiResponse<PaginatedData<propertyCard>>> {
    let url = `${environment.Api}/view-properties/${type}?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<propertyCard>>>(url);
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
  public addProperty(property: addProperty): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/add-property`;
    return this.http.post<ApiResponse<null>>(url, property);
  }
}
