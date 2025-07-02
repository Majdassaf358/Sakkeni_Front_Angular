import { Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { HomesComponent } from './Components/home/homes.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ServicesComponent } from './Components/services-component-folder/services.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeDetailsComponent } from './Components/home-details/home-details.component';
import { PropertiesComponent } from './Components/properties/properties.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: HomesComponent,
  },
  {
    path: 'properties',
    component: PropertiesComponent,
  },
  {
    path: 'home-details/:homeID',
    component: HomeDetailsComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
];
