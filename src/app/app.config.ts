import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), HttpClient,provideHttpClient(), HttpClientXsrfModule,    importProvidersFrom(HttpClientModule)
]
};
