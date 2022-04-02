import { Routes } from '@angular/router';
import { BuscarComponent } from 'src/app/components/buscar/buscar.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { PlaylistsComponent } from 'src/app/components/playlists/playlists.component';
import { PlayerComponent } from './player.component';

export const PlayerRotas: Routes = [
    {
        path: '',
        component: PlayerComponent,

        children: [
            {
                path: 'inicio',
                component: InicioComponent
            },
            {
                path: 'buscar',
                component: BuscarComponent
            },
            {
                path: 'playlists',
                component: PlaylistsComponent
            }
        ]
    }
]