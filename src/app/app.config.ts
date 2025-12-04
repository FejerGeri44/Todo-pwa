import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import {provideFirebaseApp, initializeApp, getApp} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {provideFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager} from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

const firebaseConfig = {
  apiKey: "AIzaSyChAo_amTFe5TqtHjRmdetmsP8TAlLHB_g",
  authDomain: "todo-pwa-ff678.firebaseapp.com",
  projectId: "todo-pwa-ff678",
  storageBucket: "todo-pwa-ff678.firebasestorage.app",
  messagingSenderId: "1096773321434",
  appId: "1:1096773321434:web:13443042fa8dbf63c41be3",
  measurementId: "G-L1K1J4NW1F"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),

    provideAuth(() => getAuth()),

    provideFirestore(() => {
      return initializeFirestore(getApp(), {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      });
    }),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
};
