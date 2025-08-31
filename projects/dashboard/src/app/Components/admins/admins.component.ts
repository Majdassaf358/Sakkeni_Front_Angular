import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuperAdminService } from '../../Services/super-admin.service';
import { ApiResponse } from '../../Models/ApiResponse';
import { PaginatedData } from '../../Models/paginated_data';
import { lastValueFrom } from 'rxjs';
import { view_admins } from '../../Models/viewAdmin/view_admins';

@Component({
  selector: 'app-admins',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css',
})
export class AdminsComponent implements OnInit {
  admins: view_admins[] = [];
  imageUrl: string = 'http://192.168.20.74:8000/';
  currentPage: number = 1;
  pagination: any;
  constructor(private router: Router, private srv: SuperAdminService) {}
  ngOnInit(): void {
    this.getAdmins(1);
  }
  async getAdmins(page: number) {
    try {
      let res: ApiResponse<PaginatedData<view_admins>> = await lastValueFrom(
        this.srv.viewAdmins(page)
      );
      this.admins = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  goTo(id: number) {
    this.router.navigate(['/profile', id]);
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.getAdmins(page);
    }
  }

  getPageRange(): number[] {
    const range: number[] = [];
    const total = this.pagination?.last_page || 1;

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(total - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  nextPage() {
    if (this.pagination?.next_page_url) {
      this.getAdmins(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.prev_page_url) {
      this.getAdmins(this.currentPage - 1);
    }
  }
}
