import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterModule, Router } from '@angular/router';
import { ApiResponse } from '../../Models/ApiResponse';
import { SuperAdminService } from '../../Services/super-admin.service';
@Component({
  selector: 'app-view-statistics',
  imports: [SideBarComponent, NavbarComponent],
  templateUrl: './view-statistics.component.html',
  styleUrl: './view-statistics.component.css',
})
export class ViewStatisticsComponent implements OnInit {
  constructor(private router: Router, private srv: SuperAdminService) {}
  ngOnInit(): void {
    this.getStatistics();
  }

  async getStatistics() {
    try {
      // let res: ApiResponse<PaginatedData<prope rtyCard>> = await lastValueFrom(
      //   this.srv.viewStatistics()
      // );
    } catch (error) {
      console.log(error);
    }
  }
}
