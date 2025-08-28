import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileIDSRT: string = '';
  profileID: number = 0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.profileIDSRT = paramsMap.get('id') || '';
      this.profileID = Number(this.profileIDSRT);

      this.viewProfile(this.profileID);
    });
  }
  async viewProfile(id: number) {
    try {
      // let res: ApiResponse<propertyDetails> = await lastValueFrom(
      //   this.propertyservice.viewPropertyDetails(homeId)
      // );
    } catch (error) {
      console.log(error);
    }
  }
}
