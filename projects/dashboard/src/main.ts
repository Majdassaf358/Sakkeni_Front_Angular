import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const echartsProviders = importProvidersFrom(
  NgxEchartsModule.forRoot({
    echarts: () => import('echarts'),
  })
);

const mergedAppConfig = {
  ...(appConfig ?? {}),
  providers: [...((appConfig as any)?.providers ?? []), echartsProviders],
};

bootstrapApplication(AppComponent, mergedAppConfig).catch((err) =>
  console.error(err)
);
