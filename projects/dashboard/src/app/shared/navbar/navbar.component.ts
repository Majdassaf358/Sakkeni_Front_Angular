import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { OpenSideService } from '../../Services/open-side.service';
import { RouterModule, Router } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef;
  // profileInfo: profile = new profile();
  imageUrl: string = 'http://127.0.0.1:8000/';
  sidebarVisible = false;
  dropdownOpen = false;

  constructor(
    private sidebarService: OpenSideService,
    private router: Router,
    private auth: AuthService
  ) {}
  toggleSidebar() {
    this.sidebarService.toggle();
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  goToReset() {
    this.router.navigate(['/reset']);
  }
  async logout() {
    try {
      let res: ApiResponse<null> = await lastValueFrom(this.auth.adminLogout());
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
  // async getProfile() {
  //   try {
  //     let res: ApiResponse<profile> = await lastValueFrom(
  //       this.authenticationService.profile()
  //     );
  //     this.profileInfo = res.data;
  //     this.Profile = true;
  //   } catch (error) {
  //     this.Profile = false;
  //     console.log(error);
  //   }
  // }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      this.dropdownOpen &&
      this.dropdown &&
      !this.dropdown.nativeElement.contains(event.target)
    ) {
      this.dropdownOpen = false;
    }
  }
}
