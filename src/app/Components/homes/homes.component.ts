import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  standalone: true,
  imports: [NavbarComponent, FiltersComponent, CommonModule],
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
})
export class HomesComponent implements OnInit {
  sideFilter: string = 'list';
  constructor(private router: Router) {}
  ngOnInit(): void {}
  updateSideFilter(Value: string) {
    this.sideFilter = Value;
  }
  goToDetails() {
    this.router.navigate(['/homess']);
  }
}
