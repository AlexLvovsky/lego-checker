import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, first, forkJoin, switchMap } from 'rxjs';

import { SearchResult, Set } from '../../shared/interfaces';
import { SetsService } from '../sets.service';
import { hexToRgb } from 'src/app/shared/functions';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  set$: Observable<Set>;
  setAlternates$: Observable<SearchResult[]>;
  setMinifigs$: Observable<SearchResult[]>;
  setParts$: Observable<SearchResult[]>;
  set: Set;
  setAlternates: SearchResult[];
  setMinifigs: SearchResult[];
  setParts: SearchResult[];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private setService: SetsService
  ) {}

  ngOnInit(): void {
    const test = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const set_num = params.get('set_num');

        // Use forkJoin to combine the Observables into one
        return forkJoin([
          this.setService.getSet(set_num),
          this.setService.getSetAlternates(set_num),
          this.setService.getSetMinifigs(set_num),
          this.setService.getSetParts(set_num),
          this.setService.getSetMinifigsParts(set_num),
        ]);
      })
    );
    test.pipe(first()).subscribe(([one, two, three, four, five]) => {
      this.set = one;
      this.setAlternates = two;
      this.setMinifigs = three;
      const sortedParts = [...four, ...five].slice().sort((a, b) => {
        // Convert the hex codes to RGB values for comparison
        const rgbA = hexToRgb(a.rgb);
        const rgbB = hexToRgb(b.rgb);

        // Compare the RGB values element-wise
        for (let i = 0; i < 3; i++) {
          if (rgbA[i] !== rgbB[i]) {
            return rgbA[i] - rgbB[i];
          }
        }

        // If the RGB values are the same, maintain the original order
        return 0;
      });
      this.setParts = sortedParts;

      this.loading = false;
    });
  }

  saveMissingParts() {
    
  }
}
