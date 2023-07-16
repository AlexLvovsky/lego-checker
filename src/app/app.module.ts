import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideFunctions(() => getFunctions()),
    // provideStorage(() => getStorage()),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    // {
    //   provide: USE_FUNCTIONS_EMULATOR,
    //   useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    // },
    // {
    //   provide: USE_AUTH_EMULATOR,
    //   useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
    // },
  ],
  bootstrap: [HomePageComponent],
})
export class AppModule {}
