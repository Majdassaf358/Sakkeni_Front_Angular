import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { interceptorInterceptor } from './Interceptors/interceptor.interceptor';
import { loaderInterceptor } from './Interceptors/loader.interceptor';
import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([interceptorInterceptor, loaderInterceptor])
    ),
    provideNgxStripe(
      'pk_test_51S2C9JFGp8MM24lt1C5YfvI6Lud172VBjygqMBDt8znVyw8b1eIm0nPQiKIoB5IAnPAX4Vqb31vCR7VmqqeIZHCL00SvBiM1Z0'
    ),
  ],
};
