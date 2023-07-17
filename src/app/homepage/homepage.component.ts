import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  key$: any;
  data$: any;
  constructor(public authService: AuthService) {
    // const callable = this.functions.httpsCallable('getRebrickableKey');
    // this.data$ = callable({});
  }

    ngOnInit(): void {
  }
}
