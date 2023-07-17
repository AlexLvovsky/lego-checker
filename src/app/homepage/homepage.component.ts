import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { httpsCallable, Functions } from '@angular/fire/functions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  key$: any;
  data$: any;
  constructor(
    public authService: AuthService,
    private funcs: Functions
  ) {
    // const callable = httpsCallable(funcs, 'getRebrickableKey');
    // this.data$ = callable({});
  }

  ngOnInit(): void {}
}
