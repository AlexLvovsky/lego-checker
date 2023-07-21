import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { buildUrlParams, getNoImageUrl } from '../functions';
import {
  SearchCriteria,
  SearchResponse,
  SetResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly _noImageUrl: SafeUrl;
  private readonly _searchCriteria = new BehaviorSubject<SearchCriteria | null>(
    null
  );
  private readonly _searchResults = new BehaviorSubject<SearchResponse | null>(
    null
  );

  readonly searchResults$: Observable<SearchResponse | null> =
    this._searchResults.asObservable();

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this._noImageUrl = this.domSanitizer.bypassSecurityTrustUrl(
      getNoImageUrl()
    );
    this.getSearchResults().subscribe();
  }

  private getSetSearchResults(urlParams: string): Observable<SearchResponse> {
    return this.http
      .get<SetResponse>(`${environment.host}/sets/?${urlParams}`)
      .pipe(
        map(response => {
          return {
            count: response.count,
            next: response.next,
            previous: response.previous,
            results: response.results.map(entry => {
              return {
                id: entry.set_num,
                imgUrl: entry.set_img_url || this._noImageUrl,
                name: entry.name,
                routerUrl: `/sets/${entry.set_num}`,
              };
            }),
          };
        })
      );
  }

  private getSearchResults(): Observable<SearchResponse> {
    return this._searchCriteria.asObservable().pipe(
      filter(
        (searchCriteria): searchCriteria is SearchCriteria => !!searchCriteria
      ),
      switchMap(searchCriteria => {
        const urlParams = buildUrlParams(searchCriteria);
          let obs: Observable<SearchResponse> = of({
              results: [],
              count: 0
          });

        switch (searchCriteria.search_type) {
          case 'sets':
            obs = this.getSetSearchResults(urlParams);
            break;
        }

        return obs.pipe(
          tap(searchResults => this._searchResults.next(searchResults))
        );
      })
    );
  }

  getCurrentSearchCriteria(): SearchCriteria | null {
    return this._searchCriteria.getValue();
  }

  search(searchCriteria: SearchCriteria): void {
    this._searchCriteria.next(searchCriteria);
    this._searchResults.next(null);
  }
}
