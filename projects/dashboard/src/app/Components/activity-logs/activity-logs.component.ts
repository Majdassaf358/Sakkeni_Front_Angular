import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../Models/ApiResponse';
import { Router } from '@angular/router';
import { PaginatedData } from '../../Models/paginated_data';
import { lastValueFrom } from 'rxjs';
import { PopComponent } from '../../shared/pop/pop.component';

import { ChartsService } from '../../Services/charts.service';
import { logs } from '../../Models/activity-logs/logs';

type TabFilter = 'Users' | 'System';

@Component({
  selector: 'app-activity-logs',
  imports: [CommonModule],
  templateUrl: './activity-logs.component.html',
  styleUrl: './activity-logs.component.css',
})
export class ActivityLogsComponent implements OnInit {
  logs: logs[] = [];
  currentPage: number = 1;
  pagination: any;

  constructor(private router: Router, private srv: ChartsService) {}
  ngOnInit(): void {
    this.viewActivityLogs(1);
  }

  async viewActivityLogs(page: number) {
    try {
      let res: ApiResponse<PaginatedData<logs>> = await lastValueFrom(
        this.srv.getActivityLogs(page)
      );
      this.logs = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
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
  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.viewActivityLogs(page);
    }
  }

  nextPage() {
    if (this.pagination?.next_page_url) {
      this.viewActivityLogs(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.prev_page_url) {
      this.viewActivityLogs(this.currentPage - 1);
    }
  }
}
