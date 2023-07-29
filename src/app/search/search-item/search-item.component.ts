import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SearchResult } from '../../shared/interfaces';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  @Input() searchResults: SearchResult[];
  @Input() userSetIds: any[];
  @Input() userId: any;

  constructor(private dbService: DbService) {}

  // Check if the set is in the user's sets (using setIds)
  isSetInUserSets(legoSet: SearchResult): boolean {
    return this.userSetIds?.includes(legoSet.id);
  }

  // Add the set to the user's collection
  addToUserSets(legoSet: SearchResult) {
    // Add the set to the user's collection using DbService
    this.dbService.addSetToUserSets(this.userId, legoSet);
  }
}
