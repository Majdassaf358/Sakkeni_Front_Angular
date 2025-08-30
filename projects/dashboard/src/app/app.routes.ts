import { Routes } from '@angular/router';
import { ViewStatisticsComponent } from './Components/view-statistics/view-statistics.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { PropertiesComponent } from './Components/properties/properties.component';
import { ServiceProvidersComponent } from './Components/service-providers/service-providers.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ViewPropertyComponent } from './Components/view-property/view-property.component';
import { ViewServiceComponent } from './Components/view-service/view-service.component';
import { ActivityLogsComponent } from './Components/activity-logs/activity-logs.component';
import { MyPropertiesComponent } from './Components/my-properties/my-properties.component';

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
    path: 'property/:Pid',
    component: ViewPropertyComponent,
  },
  {
    path: 'service/:Sid',
    component: ViewServiceComponent,
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
    path: 'activity',
    component: ActivityLogsComponent,
  },
  {
    path: 'properties',
    component: PropertiesComponent,
  },
  {
    path: 'my-properties',
    component: MyPropertiesComponent,
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
