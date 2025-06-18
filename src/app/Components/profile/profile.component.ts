import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { profile } from '../../Models/profile';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { updateProfile } from '../../Models/updateProfile';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FiltersComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileInfo: profile = new profile();
  updatedProfile: updateProfile = new updateProfile();
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

  async getProfile() {
    try {
      let res: ApiResponse<profile> = await lastValueFrom(
        this.authenticationService.profile()
      );
      this.profileInfo = res.data;
      this.updatedProfile = {
        address: this.profileInfo.address,
        phone_number: this.profileInfo.phone_number,
        profile_pic: this.profileInfo.profile_picture_path,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateProfile() {
    try {
      let res: ApiResponse<null> = await lastValueFrom(
        this.authenticationService.updateProfile(this.updatedProfile)
      );
    } catch (error) {
      console.log(error);
    }
  }
  cancelChanges() {
    this.updatedProfile = {
      address: this.profileInfo.address,
      phone_number: this.profileInfo.phone_number,
      profile_pic: this.profileInfo.profile_picture_path,
    };
    this.router.navigate(['/home']);
  }
}
