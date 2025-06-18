import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { login } from '../Models/login';
import { authenticationRes } from '../Models/authenticationRes';
import { sign_up } from '../Models/sign-up';
import { profile } from '../Models/profile';
import { updateProfile } from '../Models/updateProfile';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public signUp(req: sign_up): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.Api}/sign-up`;
    return this.http.post<ApiResponse<authenticationRes>>(url, req);
  }
  public login(req: login): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.Api}/login`;
    return this.http.post<ApiResponse<authenticationRes>>(url, req);
  }
  public profile(): Observable<ApiResponse<profile>> {
    let url = `${environment.Api}/my-profile`;
    return this.http.get<ApiResponse<profile>>(url);
  }
  public updateProfile(req: updateProfile): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/my-profile`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
  public logout(): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/logout`;
    return this.http.get<ApiResponse<null>>(url);
  }
}
