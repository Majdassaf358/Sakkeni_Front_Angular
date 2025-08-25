import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AdministrationService } from '../../Services/administration.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-service',
  imports: [NavbarComponent],
  templateUrl: './view-service.component.html',
  styleUrl: './view-service.component.css',
})
export class ViewServiceComponent implements OnInit {
  serviceIDSRT: string = '';
  serviceID: number = 0;
  constructor(
    private route: ActivatedRoute,
    private srv: AdministrationService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.serviceIDSRT = paramsMap.get('Sid') || '';
      this.serviceID = Number(this.serviceIDSRT);

      this.viewService(this.serviceID);
    });
  }
  async viewService(id: number) {
    try {
      // let res: ApiResponse<propertyDetails> = await lastValueFrom(
      //   this.propertyservice.viewPropertyDetails(id)
      // );
    } catch (error) {
      console.log(error);
    }
  }
}
