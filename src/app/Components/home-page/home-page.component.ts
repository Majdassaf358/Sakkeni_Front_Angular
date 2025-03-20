import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validations';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  {
  signUpForm!: FormGroup;

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

  constructor(private fb: FormBuilder) {
      this.signUpForm = this.fb.group({
          userName: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required,emailValidator()]],
          password: ['', [Validators.required,Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required,Validators.minLength(8)]],
      });
  }
  ngOnInit(): void {
  }
}