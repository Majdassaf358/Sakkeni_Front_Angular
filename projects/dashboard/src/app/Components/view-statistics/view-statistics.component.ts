import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-view-statistics',
  imports: [SideBarComponent, NavbarComponent],
  templateUrl: './view-statistics.component.html',
  styleUrl: './view-statistics.component.css',
})
export class ViewStatisticsComponent {}
