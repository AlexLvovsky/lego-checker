import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: HomePageComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../app/search/search.module').then(m => m.SearchModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
