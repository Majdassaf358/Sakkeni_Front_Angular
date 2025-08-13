import { Component } from '@angular/core';
import { OpenSideService } from '../../Services/open-side.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  sidebarVisible = false;
  constructor(private sidebarService: OpenSideService) {}
  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
