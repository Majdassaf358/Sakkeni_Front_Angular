import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { profile } from '../../Models/profile/profile';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { FormsModule } from '@angular/forms';
import { updateProfile } from '../../Models/profile/updateProfile';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  imports: [NavbarComponent, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
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

  async updateProfile() {
    try {
      this.updatedProfile.first_name = this.profileInfo.first_name;
      this.updatedProfile.last_name = this.profileInfo.last_name;
      this.updatedProfile.address = this.profileInfo.address;
      this.updatedProfile.phone_number = this.profileInfo.phone_number;
      this.updatedProfile.profile_picture = this.selectedFile;

      const res = await lastValueFrom(
        this.authenticationService.updateProfileDetails(this.updatedProfile)
      );

      await this.getProfile();
    } catch (error) {
      console.log(error);
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
  cancelChanges() {
    this.router.navigate(['/home']);
  }
}
