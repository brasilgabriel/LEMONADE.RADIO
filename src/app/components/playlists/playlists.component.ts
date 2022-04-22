import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { PlayerCardComponent } from '../player-card/player-card.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  static novaMusica = new EventEmitter<any>();

  historico: any;
  favoritos: any;
  capaFavoritos: any;
  musica: any;
  mostrar_playlists: boolean = true;
  section_musicas: boolean = false;
  div_mensagem: boolean = false;
  div_tabela: boolean = false;

  constructor() {
    this.historico = [];
    this.favoritos = [];
    this.capaFavoritos = [];
    this.musica = {};
  }

  ngOnInit(): void {
    PlayerCardComponent.favoritado.subscribe(musica => this.musica = musica);
    this.criarPlaylistFavoritos();

    this.historico = JSON.parse(localStorage.getItem('Histórico') as any);
  }

  reproduzirMusica(musica: number) {
    localStorage.removeItem('Histórico');
    this.historico.push(this.favoritos[musica]);

    let cont: number = 0;

    for (let i in this.historico) {
      if (JSON.stringify(this.favoritos[musica]) === JSON.stringify(this.historico[i])) { // para ver se a música atual já existe no histórico
        cont += 1

        if (cont > 1) {
          cont = 0;
          this.historico.splice(i, 1); // se já existir, a música atual será removida para não ficar com músicas repetidas
        }
      }
    }

    localStorage.setItem('Histórico', JSON.stringify(this.historico));
    PlaylistsComponent.novaMusica.emit(this.favoritos[musica]);
  }

  tratarDuracao(duracao: number) {
    return (duracao / 60).toFixed(2).toString().replace('.', ':');
  }

  mostrarMusicas() {
    this.mostrar_playlists = false;
    this.section_musicas = true;

    this.favoritos !== null && this.favoritos.length > 0 ? this.div_tabela = true : this.div_mensagem = true;
  }

  criarPlaylistFavoritos() {
    this.favoritos = JSON.parse(localStorage.getItem('Favoritos') as any);
    let quant: number = 0;

    if (this.favoritos !== null) {
      for (let i = 0; i < this.favoritos.length; i++) {
        quant = quant + 1
        quant < 5 ? this.capaFavoritos.push(this.favoritos[i].album.cover) : ''; // limitador para mostrar até 4 imagens
      }
    }
  }
}