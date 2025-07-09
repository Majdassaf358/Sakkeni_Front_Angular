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
  selector: 'app-profile',
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  selectedFile: File | null = null;
  profileInfo: profile = new profile();
  updatedProfile: updateProfile = new updateProfile();

  imageUrl: string = 'http://127.0.0.1:8000/';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async getProfile() {
    try {
      let res: ApiResponse<profile> = await lastValueFrom(
        this.authenticationService.profile()
      );
      this.profileInfo = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  goToEditProfile() {
    this.router.navigate(['/edit']);
  }
  resetPass() {
    this.router.navigate(['/reset']);
  }
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target.src !== 'assets/images/default-profile.png') {
      target.src = 'assets/images/default-profile.png';
    }
  }
}
