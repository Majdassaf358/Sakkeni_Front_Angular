import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../shared/environments';
import { propertyCard } from '../Models/property-card';
import { PaginatedData } from '../Models/paginatedData';
import { addProperty } from '../Models/addProperty';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  public viewProperty(
    readyOrOff: 'ready-to-move-in',
    comOrRes: 'commercial',
    purOrRent: string,
    page: number = 1
  ): Observable<ApiResponse<PaginatedData<propertyCard>>> {
    let url = `${environment.Api}/view-properties/${readyOrOff}/${comOrRes}/${purOrRent}/?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<propertyCard>>>(url);
  }
  public addProperty(property: addProperty): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/add-property`;
    return this.http.post<ApiResponse<null>>(url, property);
  }
}
