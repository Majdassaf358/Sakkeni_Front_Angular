import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ApiResponse } from '../../Models/ApiResponse';
import { propertyDetails } from '../../Models/viewproperty/property-details';
import { lastValueFrom } from 'rxjs';
import { AdministrationService } from '../../Services/administration.service';

@Component({
  selector: 'app-view-property',
  imports: [NavbarComponent],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css',
})
export class ViewPropertyComponent implements OnInit {
  propertyIDSRT: string = '';
  propertyID: number = 0;
  constructor(
    private route: ActivatedRoute,
    private srv: AdministrationService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.propertyIDSRT = paramsMap.get('Pid') || '';
      this.propertyID = Number(this.propertyIDSRT);

      this.viewProperty(this.propertyID);
    });
  }
  async viewProperty(id: number) {
    try {
      let res: ApiResponse<propertyDetails> = await lastValueFrom(
        this.srv.viewPropertyDetails(id)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
