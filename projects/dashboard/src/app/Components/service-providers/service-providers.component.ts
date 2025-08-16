import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-service-providers',
  imports: [SideBarComponent, NavbarComponent],
  templateUrl: './service-providers.component.html',
  styleUrl: './service-providers.component.css',
})
export class ServiceProvidersComponent {}
