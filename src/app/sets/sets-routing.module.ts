import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetComponent } from './set/set.component';

const routes: Routes = [
  {
    path: ':set_num',
    component: SetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetsRoutingModule {}
