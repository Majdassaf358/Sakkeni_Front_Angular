import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { HomesComponent } from './Components/homes/homes.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ServicesComponent } from './Components/services/services.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'homes',
        component: HomesComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
];