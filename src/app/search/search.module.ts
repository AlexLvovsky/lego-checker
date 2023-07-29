import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../shared/services/search.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from '../shared/request-interceptor';
import { SearchItemComponent } from './search-item/search-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchComponent, SearchItemComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    SearchService
  ],
})
export class SearchModule {}
