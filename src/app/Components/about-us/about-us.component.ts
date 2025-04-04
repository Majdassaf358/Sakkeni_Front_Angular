import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-about-us',
  imports: [NavbarComponent,FiltersComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
