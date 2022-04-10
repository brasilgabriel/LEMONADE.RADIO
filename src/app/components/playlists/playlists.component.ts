import { Component, OnInit } from '@angular/core';
import { PlayerCardComponent } from '../player-card/player-card.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists: any;
  favoritos: any;
  musica: any;

  constructor() {
    this.playlists = [];
    this.favoritos = [];
    this.musica = {};
  }

  ngOnInit(): void {
    PlayerCardComponent.favoritado.subscribe(
      musica => {
        this.musica = musica;
      }
    );
  }
}