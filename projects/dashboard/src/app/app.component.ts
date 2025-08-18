import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';
}
