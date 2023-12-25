import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayCountryPageRoutingModule } from './play-country-routing.module';

import { PlayCountryPage } from './play-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayCountryPageRoutingModule
  ],
  declarations: [PlayCountryPage]
})
export class PlayCountryPageModule {}
