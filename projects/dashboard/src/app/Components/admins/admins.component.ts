import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuperAdminService } from '../../Services/super-admin.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { PaginatedData } from '../../Models/paginated_data';
import { lastValueFrom } from 'rxjs';
import { view_admins } from '../../Models/viewAdmin/view_admins';

type TabFilter = 'Properties' | 'Service Provider';

@Component({
  selector: 'app-admins',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css',
})
export class AdminsComponent implements OnInit {
  tabs: TabFilter[] = ['Properties', 'Service Provider'];
  activeFilter: TabFilter = 'Properties';

  admins: view_admins[] = [];

  constructor(private router: Router, private srv: SuperAdminService) {}
  ngOnInit(): void {
    this.getAdmins();
  }
  async getAdmins() {
    try {
      let res: ApiResponse<PaginatedData<view_admins>> = await lastValueFrom(
        this.srv.viewAdmins(1)
      );
      this.admins = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  setFilter(filter: TabFilter) {
    this.activeFilter = filter;
  }
}
