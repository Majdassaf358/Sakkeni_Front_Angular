import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-services',
  imports: [NavbarComponent,FiltersComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
