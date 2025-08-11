import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { profile } from '../../Models/profile/profile';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormsModule } from '@angular/forms';
import { updateProfile } from '../../Models/profile/updateProfile';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-history',
  imports: [NavbarComponent],
  templateUrl: './profile-history.component.html',
  styleUrl: './profile-history.component.css',
})
export class ProfileHistoryComponent {}
