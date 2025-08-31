import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { AdministrationService } from '../../Services/administration.service';
import { propertyCard } from '../../Models/property-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-properties',
  imports: [CommonModule],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css',
})
export class MyPropertiesComponent implements OnInit {
  page: number = 1;
  currentPage: number = 1;
  pagination: any;
  my: propertyCard[] = [];
  type: string = 'rent';
  imageUrl: string = 'http://127.0.0.1:8000/';

  constructor(private srv: AdministrationService, private router: Router) {}
  ngOnInit(): void {
    this.myProperties(1);
  }

  async myProperties(page: number) {
    try {
      let res = await lastValueFrom(this.srv.viewMyProperties(this.type, page));
      this.my = res.data.data;
      this.currentPage = res.data.current_page;
      this.pagination = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  changeType(change: string) {
    this.type = change;
    this.myProperties(1);
  }

  goTo(id: number) {
    this.router.navigate(['/property', id]);
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.myProperties(page);
    }
  }

  nextPage() {
    if (this.pagination?.next_page_url) {
      this.myProperties(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.prev_page_url) {
      this.myProperties(this.currentPage - 1);
    }
  }

  getPageRange(): number[] {
    const total = this.pagination?.last_page || 1;
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  getImageSrc(path?: string): string {
    if (!path) {
      return 'assets/Imgs/pool.jpg';
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return this.imageUrl + path;
  }
}
