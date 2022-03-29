import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const AppRotas: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
