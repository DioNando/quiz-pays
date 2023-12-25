import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayQuizPageRoutingModule } from './play-quiz-routing.module';

import { PlayQuizPage } from './play-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayQuizPageRoutingModule
  ],
  declarations: [PlayQuizPage]
})
export class PlayQuizPageModule {}
