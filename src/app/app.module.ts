import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator,
} from '@angular/fire/functions';
import {
  provideStorage,
  getStorage,
  connectStorageEmulator,
} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      // if (location.hostname === 'localhost') {
      //   connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
      //     disableWarnings: true,
      //   });
      // }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (location.hostname === 'localhost') {
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
      return firestore;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (location.hostname === 'localhost') {
        connectFunctionsEmulator(functions, '127.0.0.1', 5001);
      }
      return functions;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (location.hostname === 'localhost') {
        connectStorageEmulator(storage, '127.0.0.1', 5001);
      }
      return storage;
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [HomePageComponent],
})
export class AppModule {}
