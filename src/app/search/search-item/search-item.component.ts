import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { SearchResult } from '../../shared/interfaces';
import { DbService } from 'src/app/shared/services/db.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'firebase/auth';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent implements OnInit {
  @Input() searchResults: SearchResult[];
  @Input() userSetIds: any[];
  user: User;
  private authSubscription: Subscription;

  constructor(
    private dbService: DbService,
    public  authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user$;
        user.pipe(take(1)).subscribe(user => {
          if (user) {
            this.user = user
          }
        });
  }

  // Check if the set is in the user's sets (using setIds)
  isSetInUserSets(legoSet: SearchResult): boolean {
    return this.userSetIds?.includes(legoSet.id);
  }

  // Add the set to the user's collection
  addToUserSets(legoSet: SearchResult) {
    if (this.user) {
      this.dbService.addSetToUserSets(this.user.uid, legoSet);
    }
  }
}
