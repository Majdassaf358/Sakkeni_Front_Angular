import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-reports',
  imports: [SideBarComponent, NavbarComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {}
