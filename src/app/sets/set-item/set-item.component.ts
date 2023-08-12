import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { SearchResult } from '../../shared/interfaces';
import { DbService } from 'src/app/shared/services/db.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, Subject, Subscription, of, take, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetItemComponent implements OnInit, OnDestroy {
  @Input() searchResults: SearchResult[];
  @Input() setId: string;
  private userSubscription: Subscription;
  itemForm: FormGroup;
  quantityInput: { [key: number]: number | '' } = {};
  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Initialize quantityInput for all searchResults items
    this.searchResults.forEach(searchResult => {
      this.quantityInput[searchResult.id] = '';
    });

    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.fetchOwnedParts(user.uid);
      }
    });

    this.itemForm = this.fb.group({});

    // Initialize quantityInput for all searchResults items
    this.searchResults.forEach(searchResult => {
      this.itemForm.addControl(searchResult.id.toString(), this.fb.control(''));
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  fetchOwnedParts(userId: string) {
    this.dbService.getOwnedParts(userId, this.setId).subscribe(
      userData => {
        // Clear and initialize the form controls for all searchResults items
        this.searchResults.forEach(searchResult => {
          const controlValue =
            userData.find(item => item['id'] === searchResult.id)?.quantity ??
            '';
          this.itemForm.setControl(
            searchResult.id.toString(),
            this.fb.control(controlValue)
          );
        });
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  saveOwnedParts() {
    const user = this.authService.user$; // Get the user$ observable
    user.pipe(take(1)).subscribe(user => {
      if (user) {
        const userId = user.uid; // Retrieve the uid from the user object

        const itemsToSave: { id: number | string; quantity: number }[] = [];

        this.searchResults.forEach(searchResult => {
          const formControl = this.itemForm.get(searchResult.id.toString());
          const quantity = formControl ? formControl.value : '';

          if (quantity !== '' && !isNaN(quantity)) {
            itemsToSave.push({
              id: searchResult.id,
              quantity: parseInt(quantity),
            });
          }
        });

        console.log(itemsToSave);
        // Save itemsToSave to the database using dbService
        // Example using dbService.saveOwnedParts(userId, itemsToSave)
        // this.dbService.saveOwnedParts(userId, this.setId, itemsToSave).subscribe(
        //   () => {
        //     console.log('Data saved successfully.');
        //   },
        //   error => {
        //     console.error('Error saving data:', error);
        //   }
        // );
      }
    });
  }

  change(event: Event, searchResult: SearchResult) {
    // debugger;
    const formControl = this.itemForm.get(searchResult.id.toString());

    const inputValue = (event.target as HTMLInputElement).value;
    const quantity = searchResult.quantity;

    // Check if the input value is a valid number
    let validInputValue = parseInt(inputValue);
    if (isNaN(validInputValue)) {
      formControl.setValue(''); // Set to empty if the input is not a number or empty
    } else {
      // Ensure the input value is within the valid range
      validInputValue = Math.max(1, Math.min(quantity, validInputValue));

      // Update the form control value for this searchResult
      formControl.setValue(validInputValue);
    }

    // If the checkbox is checked and input value is max, uncheck the checkbox
    const checkbox = document.querySelector(
      `#checkbox_${searchResult.id}`
    ) as HTMLInputElement;
    if (checkbox && checkbox.checked && validInputValue < quantity) {
      checkbox.checked = false;
    }
    if (checkbox && !checkbox.checked && validInputValue === searchResult.quantity) {
      checkbox.checked = true;
    }
  }

  changeSetAll(event: Event, searchResult: SearchResult) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    const formControl = this.itemForm.get(searchResult.id.toString());
    if (ischecked) {
      formControl.setValue(searchResult.quantity);
    } else {
      formControl.setValue('');
    }
  }
}
