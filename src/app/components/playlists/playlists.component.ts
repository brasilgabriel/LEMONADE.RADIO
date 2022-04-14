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
  capaFavoritos: any;
  musica: any;

  constructor() {
    this.playlists = [];
    this.favoritos = [];
    this.capaFavoritos = [];
    this.musica = {};
  }

  ngOnInit(): void {
    PlayerCardComponent.favoritado.subscribe(
      musica => {
        this.musica = musica;
      }
    );

    this.criarPlaylistFavoritos();
  }

  criarPlaylistFavoritos() {
    this.favoritos = JSON.parse(localStorage.getItem('Favoritos') as any);
    let quant = 0;

    if (this.favoritos !== null) {
      for (let i = 0; i < this.favoritos.length; i++) {
        quant = quant + 1
        quant < 5 ? this.capaFavoritos.push(this.favoritos[i].imagem_albumM) : '';
      }
    }
  }
}