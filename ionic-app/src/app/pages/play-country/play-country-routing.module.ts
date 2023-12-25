import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayCountryPage } from './play-country.page';

const routes: Routes = [
  {
    path: '',
    component: PlayCountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayCountryPageRoutingModule {}
