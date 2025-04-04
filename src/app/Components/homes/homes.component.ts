import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FiltersComponent } from '../../shared/filters/filters.component';

@Component({
  selector: 'app-homes',
  imports: [NavbarComponent,FiltersComponent],
  templateUrl: './homes.component.html',
  styleUrl: './homes.component.css'
})
export class HomesComponent {

}
