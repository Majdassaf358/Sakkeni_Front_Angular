import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { resetPassword } from '../../../Models/profile/resetPassword';
import { AuthenticationService } from '../../../Services/authentication.service';
import { ApiResponse } from '../../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  newPassForm!: FormGroup;

  get currentPassword() {
    return this.newPassForm.get('currentPassword');
  }
  get newPassword() {
    return this.newPassForm.get('newPassword');
  }
  get newPassword_confirmation() {
    return this.newPassForm.get('newPassword_confirmation');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.newPassForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword_confirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  async changePass() {
    var req: resetPassword = {
      currentPassword: this.newPassForm.get('currentPassword')?.value,
      newPassword: this.newPassForm.get('newPassword')?.value,
      newPassword_confirmation: this.newPassForm.get('newPassword_confirmation')
        ?.value,
    };
    try {
      let res: ApiResponse<null> = await lastValueFrom(
        this.authenticationService.resetPassword(req)
      );
      console.log(res.message);
      this.router.navigate(['/profile']);
    } catch (error) {
      console.log(error);
    }
  }
  cancel() {
    this.router.navigate(['/profile']);
  }
}
