import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import { host } from '../../environments/api';
import { getNoImageUrl } from '../shared/functions';
import { SearchResult, Set } from '../shared/interfaces';
// import { ThemesService } from '../shared/services/themes.service';

import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  private readonly _noImageUrl: SafeUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient // private themesSvc: ThemesService
  ) {
    this._noImageUrl = this.domSanitizer.bypassSecurityTrustUrl(
      getNoImageUrl()
    );
  }

  getSet(set_num: string): Observable<Set> {
    return this.http.get<Set>(`${environment.host}/sets/${set_num}`).pipe(
      map(set => {
        set.set_img_url = set.set_img_url || this._noImageUrl;

        return {
          ...set,
          //   theme_name: themes.find(theme => theme.id === set.theme_id)?.name,
        };
      })
    );
  }

  getSetAlternates(set_num: string): Observable<SearchResult[]> {
    return this.http
      .get<any>(
        `${environment.host}/sets/${set_num}/alternates/?ordering=name&page_size=1000`
      )
      .pipe(
        map(response => response.results),
        map(results =>
          results.map(result => {
            result.moc_img_url = result.moc_img_url || this._noImageUrl;

            return {
              designer_name: result.designer_name,
              designer_url: result.designer_url,
              id: result.set_num,
              imgUrl: result.moc_img_url,
              moc_url: result.moc_url,
              name: result.name,
              routerUrl: null,
            };
          })
        )
      );
  }

  getSetMinifigs(set_num: string): Observable<SearchResult[]> {
    return this.http
      .get<any>(`${environment.host}/sets/${set_num}/minifigs/?page_size=1000`)
      .pipe(
        map(response => response.results),
        map(results =>
          results.map(result => {
            result.set_img_url = result.set_img_url || this._noImageUrl;

            return {
              id: result.set_num,
              imgUrl: result.set_img_url,
              name: result.set_name,
              routerUrl: `/minifigs/${result.set_num}`,
            };
          })
        )
      );
  }

  getMinifigParts(set_num: string | number): Observable<SearchResult[]> {
    return this.http
      .get<any>(`${environment.host}/minifigs/${set_num}/parts/?page_size=1000`)
      .pipe(
        map(response => response.results),
        map(results =>
          results.map(result => {
            result.part.part_img_url =
              result.part.part_img_url || this._noImageUrl;

            return {
              id: result.id,
              partNum: result.part.part_num,
              imgUrl: result.part.part_img_url,
              name: result.part.name,
              routerUrl: `/parts/${result.part.part_num}`,
              quantity: result.quantity,
              color: result.color.name,
              rgb: result.color.rgb,
            };
          })
        )
      );
  }

  // In your component or service
  getSetMinifigsParts(set_num: string): Observable<SearchResult[]> {
    // First, get all the minifigs of the specific set
    return this.getSetMinifigs(set_num).pipe(
      mergeMap((minifigs: SearchResult[]) => {
        // For each minifig, call the getMinifigParts API and gather the resulting Observables
        const minifigPartObservables = minifigs.map((minifig: SearchResult) => {
          return this.getMinifigParts(minifig.id);
        });

        // Use forkJoin to combine all the Observables into a single Observable
        return forkJoin(minifigPartObservables);
      }),
      // After forkJoin, the emitted value is an array of arrays of Part
      // Use mergeMap and toArray to flatten the array of arrays into a single array
      mergeMap((minifigParts: any[][]) => {
        return minifigParts.reduce(
          (acc: any[], curr: any[]) => acc.concat(curr),
          []
        );
      }),
      toArray() // Convert the flattened array back to a single array of Part[]
    );
  }

  getSetParts(set_num: string): Observable<SearchResult[]> {
    return this.http
      .get<any>(
        `${environment.host}/sets/${set_num}/parts/?ordering=color&page_size=1000`
      )
      .pipe(
        map(response => response.results),
        map(results =>
          results.map(result => {
            result.part.part_img_url =
              result.part.part_img_url || this._noImageUrl;

            return {
              id: result.id,
              partNum: result.part.part_num,
              imgUrl: result.part.part_img_url,
              name: result.part.name,
              quantity: result.quantity,
              routerUrl: `/parts/${result.part.part_num}`,
              color: result.color.name,
              rgb: result.color.rgb,
            };
          })
        )
      );
  }
}
