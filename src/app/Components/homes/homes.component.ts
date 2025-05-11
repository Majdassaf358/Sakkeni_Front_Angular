import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homes',
  imports: [NavbarComponent, FiltersComponent, CommonModule],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css',
})
export class HomesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
