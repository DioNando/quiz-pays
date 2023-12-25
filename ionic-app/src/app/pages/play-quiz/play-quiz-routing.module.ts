import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayQuizPage } from './play-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: PlayQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayQuizPageRoutingModule {}
