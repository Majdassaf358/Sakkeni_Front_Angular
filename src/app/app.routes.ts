import { Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { HomesComponent } from './Components/home/homes.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ServicesComponent } from './Components/services-component-folder/services.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password/reset-password.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ViewPropertiesComponent } from './Components/properties/view-properties/view-properties.component';
import { PropertyDetailsComponent } from './Components/properties/property-details/property-details.component';
import { AddPropertyComponent } from './Components/properties/add-property/add-property.component';

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
    component: ViewPropertiesComponent,
  },
  {
    path: 'home-details/:homeID',
    component: PropertyDetailsComponent,
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
    path: 'edit',
    component: EditProfileComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'add_property',
    component: AddPropertyComponent,
  },
];
