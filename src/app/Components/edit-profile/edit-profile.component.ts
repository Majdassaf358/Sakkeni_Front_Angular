import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  profileInfo: profile = new profile();
  updatedProfile: updateProfile = new updateProfile();
  accountType: number = 1;
  previewUrl: string | null = null;
  imageUrl: string = 'http://127.0.0.1:8000/';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }
  get avatarSrc(): string {
    if (this.previewUrl) {
      return this.previewUrl;
    }
    if (this.profileInfo.profile_picture_path) {
      return this.imageUrl + this.profileInfo.profile_picture_path;
    }
    return 'assets/Imgs/em.jpeg';
  }
  onFileSelected(event: any) {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  async updateProfile() {
    try {
      this.updatedProfile.address = this.profileInfo.address;
      this.updatedProfile.phone_number = this.profileInfo.phone_number;
      this.updatedProfile.profile_picture = this.selectedFile;

      const res = await lastValueFrom(
        this.authenticationService.updateProfileDetails(this.updatedProfile)
      );
      const res2 = await lastValueFrom(
        this.authenticationService.upgradeToSeller(this.accountType)
      );
      this.previewUrl = null;
      this.router.navigate(['/profile']);
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
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  cancelChanges() {
    this.router.navigate(['/profile']);
  }
}
