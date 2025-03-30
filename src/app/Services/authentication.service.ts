import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { login } from '../Models/login';
import { authenticationRes } from '../Models/authenticationRes';
import { sign_up } from '../Models/Sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public signUp(req: sign_up) : Observable<ApiResponse<sign_up>>{
    let url = `${environment.Api}/`;
    return this.http.post<ApiResponse<sign_up>>(url, req);
  }
  public login(req: login): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.Api}/login`;
    return this.http.post<ApiResponse<authenticationRes>>(url, req);
  }
}
