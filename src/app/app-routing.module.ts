import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const AppRotas: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login', // só carregará os componentes quando a página for chamada (para o site não ficar pesado)
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  },
  {
    path: 'player', // só carregará os componentes quando a página for chamada (para o site não ficar pesado)
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
