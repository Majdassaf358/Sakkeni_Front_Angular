import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() page!: string;
  dropdownOpen = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  async logOut() {
    try {
      let res: ApiResponse<null> = await lastValueFrom(
        this.authenticationService.logout()
      );
    } catch (error) {
      console.log(error);
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => (this.dropdownOpen = false), 150);
  }

  editProfile() {
    console.log('Edit Profile clicked');
  }

  changePassword() {
    console.log('Change Password clicked');
  }

  async logout() {
    try {
      let res: ApiResponse<null> = await lastValueFrom(
        this.authenticationService.logout()
      );
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
