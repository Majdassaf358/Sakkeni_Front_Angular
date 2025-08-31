import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../../Services/authentication.service';
import { profile } from '../../Models/profile/profile';
import { MessageComponent } from '../../Components/message/message.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MessageComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() page!: string;
  @Input() withFilters!: boolean;
  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef;
  profileInfo: profile = new profile();
  isLogin: boolean = true;
  imageUrl: string = 'http://127.0.0.1:8000/';
  dropdownOpen = false;
  menuOpen = false;
  messageText = '';
  showMessagePopup = false;
  isSeller: number = 0;
  from: string = 'nav';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

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
  async getProfile() {
    try {
      let res: ApiResponse<profile> = await lastValueFrom(
        this.authenticationService.profile()
      );
      this.profileInfo = res.data;
      this.isSeller = res.data.seller.account_type.id;
      this.isLogin = true;
    } catch (error) {
      this.isLogin = false;
      console.log(error);
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  addProperty() {
    if (this.isSeller) {
      this.router.navigate(['/add_property']);
    } else {
      this.messageText = 'Please Upgrade Your Account To Seller.';
      this.showMessagePopup = true;
    }
  }

  closeDropdown() {
    setTimeout(() => (this.dropdownOpen = false), 150);
  }
  onPopupClosed() {
    this.showMessagePopup = false;
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
  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target.src !== 'assets/images/default-profile.png') {
      target.src = 'assets/images/default-profile.png';
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
