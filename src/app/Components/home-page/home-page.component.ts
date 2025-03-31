import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validations';
import { RouterModule,Router } from '@angular/router';
import { login } from '../../Models/login';
import { ApiResponse } from '../../Models/ApiResponse';
import { authenticationRes } from '../../Models/authenticationRes';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-home-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  {
  signUpForm!: FormGroup;
  logInForm!: FormGroup;
  mode:string = 'start';
  token:string = '';
  selectedProperty: string = 'ready';
  authenticationRes!: authenticationRes;
  

  get userName(){
    return this.signUpForm.get('userName');
  }
  get email(){
        return this.signUpForm.get('email');
  }
  get password(){
        return this.signUpForm.get('password');
  }
  get confirmPassword(){
        return this.signUpForm.get('confirmPassword');
  }

    constructor(
      private fb: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router
    ) {
      this.signUpForm = this.fb.group({
          userName: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required,emailValidator()]],
          password: ['', [Validators.required,Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required,Validators.minLength(8)]],
      });
      this.logInForm = this.fb.group({
          email: ['', [Validators.required,emailValidator()]],
          password: ['', [Validators.required,Validators.minLength(8)]],
      });
  }
  ngOnInit(): void {
  }

  switchToLogIn(){
    this.mode='log';
  }
  switchToSignUp(){
    this.mode='sign';
  }
  selectProperty(property: string) {
  this.selectedProperty = property;
  
  }

  async loginFunction() {
    var req: login = this.logInForm.getRawValue();
    try {
      let res: ApiResponse<authenticationRes> = await lastValueFrom(
        this.authenticationService.login(req)
      );
      this.authenticationRes = res.data;
      this.token = res.data.token || '';
      localStorage.setItem('Token', this.token);
      this.router.navigate(['/homes']);
    } catch (error) {
      console.log(error);
    }
  }
}