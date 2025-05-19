import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { profile } from '../../Models/profile';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FiltersComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileInfo: profile = new profile();
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit(): void {
    this.getProfile();
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
}
