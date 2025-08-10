import { Routes } from '@angular/router';
import { ViewStatisticsComponent } from './Components/view-statistics/view-statistics.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: ViewStatisticsComponent,
  },
  {
    path: 'statistics',
    component: ViewStatisticsComponent,
  },
];
