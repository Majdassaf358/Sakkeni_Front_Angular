import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-admins',
  imports: [SideBarComponent, NavbarComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css',
})
export class AdminsComponent {}
