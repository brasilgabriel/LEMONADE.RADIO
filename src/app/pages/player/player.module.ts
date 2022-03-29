import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { BuscarComponent } from 'src/app/components/buscar/buscar.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { PlaylistsComponent } from 'src/app/components/playlists/playlists.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerComponent,
    InicioComponent,
    BuscarComponent,
    PlaylistsComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas)
  ]
})

export class PlayerModule { }
