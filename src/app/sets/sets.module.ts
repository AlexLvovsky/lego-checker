import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetComponent } from './set/set.component';
import { SetsRoutingModule } from './sets-routing.module';
import { SetsService } from './sets.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SetItemComponent } from './set-item/set-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SetComponent, SetItemComponent],
  imports: [
    CommonModule,
    SetsRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SetsService],
})
export class SetsModule {}
