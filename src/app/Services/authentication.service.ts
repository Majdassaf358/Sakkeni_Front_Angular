import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../shared/environments';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { Sign_up } from '../Models/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public signUp() : Observable<ApiResponse<Sign_up[]>>{
    let url = `${environment.Api}/`;
    return this.http.post(url, {});
  }
}
