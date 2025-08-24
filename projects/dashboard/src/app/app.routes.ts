import { Routes } from '@angular/router';
import { ViewStatisticsComponent } from './Components/view-statistics/view-statistics.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { PropertiesComponent } from './Components/properties/properties.component';
import { ServiceProvidersComponent } from './Components/service-providers/service-providers.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'statistics',
    component: ViewStatisticsComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'properties',
    component: PropertiesComponent,
  },
  {
    path: 'services',
    component: ServiceProvidersComponent,
  },
  {
    path: 'admins',
    component: AdminsComponent,
  },
];
