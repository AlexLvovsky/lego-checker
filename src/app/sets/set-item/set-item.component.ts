import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SearchResult } from '../../shared/interfaces';

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetItemComponent {
  @Input() searchResults: SearchResult[];

  saveMissingParts() {
    
  }
}
