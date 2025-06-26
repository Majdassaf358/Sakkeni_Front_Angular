import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { login } from '../Models/login';
import { authenticationRes } from '../Models/authenticationRes';
import { sign_up } from '../Models/sign-up';
import { profile } from '../Models/profile/profile';
import { updateProfile } from '../Models/profile/updateProfile';

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
  public fogotPass(email: string): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.Api}/login`;
    return this.http.post<ApiResponse<authenticationRes>>(url, email);
  }
  public profile(): Observable<ApiResponse<profile>> {
    let url = `${environment.Api}/my-profile`;
    return this.http.get<ApiResponse<profile>>(url);
  }
  public updateProfileDetails(
    req: updateProfile
  ): Observable<ApiResponse<null>> {
    console.log(req);
    let url = `${environment.Api}/update-profile`;
    return this.http.post<ApiResponse<null>>(url, req);
  }
  public updateProfilePictue(file: any): Observable<ApiResponse<null>> {
    const formData = new FormData();
    formData.append('profile_picture', file, file.name);
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    console.log(formData);
    let url = `${environment.Api}/update-profile`;
    return this.http.post<ApiResponse<null>>(url, formData);
  }
  public logout(): Observable<ApiResponse<null>> {
    let url = `${environment.Api}/logout`;
    return this.http.get<ApiResponse<null>>(url);
  }
}
