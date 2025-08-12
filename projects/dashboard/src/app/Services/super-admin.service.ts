import { Injectable } from '@angular/core';
import { admin_reg } from '../Models/auth/admin_reg';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { environment } from '../shared/environments';
import { AdminRes } from '../Models/AdminRes';
import { HttpClient } from '@angular/common/http';
import { PaginatedData } from '../Models/paginated_data';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminService {
  constructor(private http: HttpClient) {}

  public adminReg(req: admin_reg): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/sign-up`;
    return this.http.post<ApiResponse<AdminRes>>(url, req);
  }
  public viewAdmins(
    page: number
  ): Observable<ApiResponse<PaginatedData<AdminRes>>> {
    let url = `${environment.Api}/view-admins?page=${page}`;
    return this.http.get<ApiResponse<PaginatedData<AdminRes>>>(url);
  }
  public viewAdminProfile(adminId: number): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/view-admin-profile/${adminId}`;
    return this.http.get<ApiResponse<AdminRes>>(url);
  }
  public removeAdmin(id: number): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/remove-admin/${id}`;
    return this.http.get<ApiResponse<AdminRes>>(url);
  }
  public searchAdmins(
    name: string,
    page: number
  ): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/search-admin?page=${page}`;
    return this.http.post<ApiResponse<AdminRes>>(url, { name: name });
  }
}
