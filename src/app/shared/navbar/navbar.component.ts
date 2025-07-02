import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() page!: string;
  @Input() withFilters!: boolean;
  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef;
  dropdownOpen = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  goToReset() {
    this.router.navigate(['/reset']);
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

  async logout() {
    try {
      let res: ApiResponse<null> = await lastValueFrom(
        this.authenticationService.logout()
      );
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
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
