import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, SideBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';
  constructor(private router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
