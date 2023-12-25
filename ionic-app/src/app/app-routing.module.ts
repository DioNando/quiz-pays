import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'view-country/:id',
    loadChildren: () => import('./pages/view-country/view-country.module').then( m => m.ViewCountryPageModule)
  },
  {
    path: 'play-quiz',
    loadChildren: () => import('./pages/play-quiz/play-quiz.module').then( m => m.PlayQuizPageModule)
  },  {
    path: 'play-country',
    loadChildren: () => import('./pages/play-country/play-country.module').then( m => m.PlayCountryPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
