import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { AdminRes } from '../Models/AdminRes';
import { login } from '../Models/auth/login';
import { environment } from '../shared/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(req: login): Observable<ApiResponse<AdminRes>> {
    let url = `${environment.Api}/login`;
    return this.http.post<ApiResponse<AdminRes>>(url, req);
  }
}
