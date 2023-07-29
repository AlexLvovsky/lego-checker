import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetComponent } from './set/set.component';
import { SetsRoutingModule } from './sets-routing.module';
import { SetsService } from './sets.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SetItemComponent } from './set-item/set-item.component';

@NgModule({
  declarations: [SetComponent, SetItemComponent],
  imports: [CommonModule, SetsRoutingModule, SharedModule, HttpClientModule],
  providers: [SetsService]
})
export class SetsModule {}
