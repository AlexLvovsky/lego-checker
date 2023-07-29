import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject, Subscription, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  SearchCriteria,
  SearchForm,
  SearchResponse,
} from '../shared/interfaces';
import { SearchService } from '../shared/services/search.service';
import { DbService } from '../shared/services/db.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  form: FormGroup<SearchForm>;
  searching = false;
  searchResults$!: Observable<SearchResponse | null>;
  searchTypes = [
    {
      id: 'minifigs',
      name: 'Minifigs',
    },
    {
      id: 'sets',
      name: 'Sets',
    },
  ];

  searchResponse: SearchResponse;
  user: User;
  userSetIds: any[];
  private searchSubscription: Subscription;
  private authSubscription: Subscription;
  private dbSubscription: Subscription;

  constructor(
    private searchService: SearchService,
    private dbService: DbService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup<SearchForm>({
      search: new FormControl(''), // Use type assertion here
      search_type: new FormControl('sets'),
    });

    this.searchResults$ = this.searchService.searchResults$.pipe(
      tap(result => {
        if (result) {
          this.searching = false;
        }
        this.searchResponse = result;
      })
    );

    if (this.searchService.getCurrentSearchCriteria()) {
      this.form.patchValue({
        search: this.searchService.getCurrentSearchCriteria()?.search,
        search_type: this.searchService.getCurrentSearchCriteria()?.search_type,
      });
    }
    

    // Subscribe to AuthService to get the current user
    this.authSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.dbSubscription = this.dbService
          .getUserSets(user.uid)
          .pipe(
            tap(docs => console.log(docs)),
            map(docs => docs.map(doc => doc['id'])) // Use map to extract the 'id' property from each document
          )
          .subscribe(setIds => {
            this.userSetIds = setIds;
          });
      }
    });
  }

  // prevNext(url: string): void {
  //   const searchParams = url.split('?')[1];
  //   const searchCriteria = Object.fromEntries(
  //     new URLSearchParams(searchParams)
  //   );

  //   const newSearchCriteria = {
  //     ...searchCriteria,
  //     search_type: this.searchSvc.getCurrentSearchCriteria().search_type,
  //   };

  //   this.searching = true;

  //   this.searchSvc.search(newSearchCriteria);
  // }

  search(): void {
    const search = this.form.get('search').value;
    const searchType = this.form.get('search_type').value;

    const searchCriteria: SearchCriteria = {
      ordering: 'name',
      page: 1,
      page_size: 100,
      search: search || undefined,
      search_type: searchType,
    };

    this.searching = true;

    this.searchService.search(searchCriteria);
  }

  // Check if the set is in the user's sets (using setIds)
  isSetInUserSets(legoSet: any): boolean {
    return this.userSetIds?.includes(legoSet.setId);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe;
    }
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe;
    }
  }
}
