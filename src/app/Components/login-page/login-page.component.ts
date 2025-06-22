import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../shared/validations';
import { RouterModule, Router } from '@angular/router';
import { login } from '../../Models/login';
import { ApiResponse } from '../../Models/ApiResponse';
import { authenticationRes } from '../../Models/authenticationRes';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { sign_up } from '../../Models/sign-up';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  signUpForm!: FormGroup;
  logInForm!: FormGroup;
  mode: string = 'log';
  token: string = '';
  selectedProperty: string = 'ready';
  authenticationRes!: authenticationRes;

  get logEmail() {
    return this.logInForm.get('logEmail');
  }
  get logPassword() {
    return this.logInForm.get('logPassword');
  }
  get first_name() {
    return this.signUpForm.get('first_name');
  }
  get last_name() {
    return this.signUpForm.get('last_name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get password_confirmation() {
    return this.signUpForm.get('password_confirmation');
  }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.logInForm = this.fb.group({
      logEmail: ['', [Validators.required, emailValidator()]],
      logPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.signUpForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }
  ngOnInit(): void {}

  switchToLogIn() {
    this.mode = 'log';
  }
  switchToSignUp() {
    this.mode = 'sign';
  }
  selectProperty(property: string) {
    this.selectedProperty = property;
  }

  async loginFunction() {
    var req: login = {
      email: this.logInForm.get('logEmail')?.value,
      password: this.logInForm.get('logPassword')?.value,
    };
    try {
      let res: ApiResponse<authenticationRes> = await lastValueFrom(
        this.authenticationService.login(req)
      );
      this.authenticationRes = res.data;
      this.token = res.data.token || '';
      localStorage.setItem('Token', this.token);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
  async signUpFunction() {
    var req: sign_up = this.signUpForm.getRawValue();
    console.log(req);
    try {
      let res: ApiResponse<authenticationRes> = await lastValueFrom(
        this.authenticationService.signUp(req)
      );
      this.authenticationRes = res.data;
      this.token = res.data.token || '';
      localStorage.setItem('Token', this.token);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
