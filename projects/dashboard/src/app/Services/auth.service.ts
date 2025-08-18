import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { AdminRes } from '../Models/AdminRes';
import { login } from '../Models/auth/login';
import { environment } from '../shared/environments';
import { admin_reg } from '../Models/auth/admin_reg';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public adminReg(req: admin_reg): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/register-admin`;
    return this.http.post<ApiResponse<AdminRes>>(url, req);
  }
  public adminLogin(req: login): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/admin-login`;
    return this.http.post<ApiResponse<AdminRes>>(url, req);
  }
  public adminLogout(): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/logout-admin`;
    return this.http.get<ApiResponse<null>>(url);
  }
}
