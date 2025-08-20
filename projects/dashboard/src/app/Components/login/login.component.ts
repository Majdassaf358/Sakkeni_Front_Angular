import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { login } from '../../Models/auth/login';
import { ApiResponse } from '../../Models/ApiResponse';
import { AdminRes } from '../../Models/AdminRes';
import { lastValueFrom } from 'rxjs';
import { getErrorMessage } from '../../shared/messages';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logInForm!: FormGroup;
  auth!: AdminRes;
  token: string = '';

  get logEmail() {
    return this.logInForm.get('logEmail');
  }
  get logPassword() {
    return this.logInForm.get('logPassword');
  }
  constructor(
    private fb: FormBuilder,
    private srv: AuthService,
    private router: Router
  ) {
    this.logInForm = this.fb.group({
      logEmail: ['', [Validators.required]],
      logPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  getError(controlName: string, label: string) {
    return getErrorMessage(this.logInForm.get(controlName), label);
  }
  async loginFunction() {
    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      return;
    }
    var req: login = {
      email: this.logInForm.get('logEmail')?.value,
      password: this.logInForm.get('logPassword')?.value,
    };
    try {
      let res: ApiResponse<AdminRes> = await lastValueFrom(
        this.srv.adminLogin(req)
      );
      this.auth = res.data;
      this.token = res.data.token || '';
      localStorage.setItem('Token', this.token);
      this.router.navigate(['/statistics']);
    } catch (error) {
      // this.messageText = 'Login failed. Please check your credentials.';
      // this.showMessagePopup = true;
      console.log(error);
    }
  }
}
