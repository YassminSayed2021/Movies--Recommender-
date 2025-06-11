import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';

import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPQ9FT4hCqSaSuyxjBahTk2pKb9HdN1EU',
  authDomain: 'movieq-7e411.firebaseapp.com',
  projectId: 'movieq-7e411',
  storageBucket: 'movieq-7e411.firebasestorage.app',
  messagingSenderId: '850852512053',
  appId: '1:850852512053:web:ab79ad062a0404518a0c7c',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    HttpClient,
    provideHttpClient(),
    HttpClientXsrfModule,
    importProvidersFrom([HttpClientModule]),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
