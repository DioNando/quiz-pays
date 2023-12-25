import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCountryPage } from './view-country.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCountryPageRoutingModule {}
