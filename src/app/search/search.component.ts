import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  SearchCriteria,
  SearchForm,
  SearchResponse,
} from '../shared/interfaces';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
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

  constructor(private searchService: SearchService) {}

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
      })
    );

    if (this.searchService.getCurrentSearchCriteria()) {
      this.form.patchValue({
        search: this.searchService.getCurrentSearchCriteria()?.search,
        search_type: this.searchService.getCurrentSearchCriteria()?.search_type,
      });
    }
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
}
