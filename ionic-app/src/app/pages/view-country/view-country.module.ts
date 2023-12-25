import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCountryPageRoutingModule } from './view-country-routing.module';

import { ViewCountryPage } from './view-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCountryPageRoutingModule
  ],
  declarations: [ViewCountryPage]
})
export class ViewCountryPageModule {}
