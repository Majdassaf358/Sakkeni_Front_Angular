import { Component } from '@angular/core';
import { sign_up } from '../../Models/sign-up';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class YourComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {
      this.signUpForm = this.fb.group({
          userName: ['', [Validators.required]],
          email: ['', [Validators.required]],
          password: ['', [Validators.required,]],
          confirmPassword: ['', [Validators.required,]],
      });
  }
}