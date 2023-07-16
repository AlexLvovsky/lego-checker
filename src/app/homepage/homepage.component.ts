import { Component } from '@angular/core';

import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent {
  key$: any;
  data$: any;
  constructor(
    public authService: AuthService,
    private functions: AngularFireFunctions
  ) {
    const callable = this.functions.httpsCallable('getRebrickableKey');
    this.data$ = callable({});
  }
}
