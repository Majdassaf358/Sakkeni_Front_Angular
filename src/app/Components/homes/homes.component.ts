import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { propertyCard } from '../../Models/property-card';
import { PaginatedData } from '../../Models/paginatedData';
import { ApiResponse } from '../../Models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { PropertyService } from '../../Services/property.service';
import { FormsModule } from '@angular/forms';
import { filters } from '../../Models/filters';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
})
export class HomesComponent implements OnInit {
  sideFilter: string = 'list';
  currentPage: number = 1;
  properties: propertyCard[] = [];
  constructor(
    private router: Router,
    private propertyservice: PropertyService
  ) {}
  ngOnInit(): void {
    // this.getProperties();
  }
}
