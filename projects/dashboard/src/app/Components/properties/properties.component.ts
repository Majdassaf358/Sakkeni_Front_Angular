import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-properties',
  imports: [SideBarComponent, NavbarComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent {}
