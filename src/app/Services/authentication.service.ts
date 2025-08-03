import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { login } from '../Models/auth/login';
import { authenticationRes } from '../Models/authenticationRes';
import { sign_up } from '../Models/auth/sign-up';
import { profile } from '../Models/profile/profile';
import { updateProfile } from '../Models/profile/updateProfile';
import { resetPassword } from '../Models/profile/resetPassword';
import { forgot } from '../Models/auth/forgot';

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
  public fogotPass(req: forgot): Observable<string> {
    let url = `${environment.Api}/forgot-password`;
    return this.http.post<string>(url, req);
  }
  public profile(): Observable<ApiResponse<profile>> {
    let url = `${environment.Api}/my-profile`;
    return this.http.get<ApiResponse<profile>>(url);
  }
  public updateProfileDetails(
    updatedProfile: updateProfile
  ): Observable<ApiResponse<null>> {
    const formData = new FormData();
    formData.append('address', updatedProfile.address);
    formData.append('phone_number', updatedProfile.phone_number);
    if (updatedProfile.profile_picture) {
      formData.append('profile_picture', updatedProfile.profile_picture);
    }
    let url = `${environment.Api}/update-profile`;
    return this.http.post<ApiResponse<null>>(url, formData);
  }
  public upgradeToSeller(account_type: number): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/upgrade-to-seller`;
    return this.http.post<ApiResponse<null>>(url, {
      account_type_id: account_type,
    });
  }
  public logout(): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/logout`;
    return this.http.get<ApiResponse<null>>(url);
  }
  public resetPassword(req: resetPassword): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/reset-password`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
}
