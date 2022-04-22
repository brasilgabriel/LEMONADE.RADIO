import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { PlaylistsComponent } from '../playlists/playlists.component';
import { ResultadoMusicasComponent } from '../resultado-musicas/resultado-musicas.component';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})

export class PlayerCardComponent implements OnInit {

  // para manipular a DOM
  @ViewChild('texto', { static: false }) texto!: ElementRef;

  // para emitir um evento
  static favoritado = new EventEmitter<any>();

  musica: any;
  favoritos: any;
  section: boolean = false;
  favorito_vazio: boolean = false;
  favorito_preenchido: boolean = false;

  constructor() {
    this.musica = {};
    this.favoritos = [];
  }

  ngOnInit(): void {
    InicioComponent.novaMusica.subscribe( // recebe o evento emitido de outro componente
      musica => {
        this.musica = musica;
        this.reproduzirMusica();
      }
    );

    ResultadoMusicasComponent.novaMusica.subscribe(
      musica => {
        this.musica = musica;
        this.reproduzirMusica();
      }
    );

    PlaylistsComponent.novaMusica.subscribe(
      musica => {
        this.musica = musica;
        this.reproduzirMusica();
      }
    )

    JSON.parse(localStorage.getItem('Favoritos') as any) !== null ? this.favoritos = JSON.parse(localStorage.getItem('Favoritos') as any) : '';
  }

  // metódo para favoritar as músicas
  favoritar() {
    PlayerCardComponent.favoritado.emit(this.musica); // evento emitido
    JSON.parse(localStorage.getItem('Favoritos') as any) !== null ? this.favoritos = JSON.parse(localStorage.getItem('Favoritos') as any) : '';

    this.favoritos.push(this.musica);
    let cont: number = 0;

    for (let i in this.favoritos) {

      if (JSON.stringify(this.musica) === JSON.stringify(this.favoritos[i])) {
        cont += 1
        this.favorito_vazio = false;
        this.favorito_preenchido = true;

        // se for maior que um, significa que o coração foi clicado mais de uma vez, então pode ter desfavoritado a música
        if (cont > 1) {
          cont = 0;

          // aqui vai limpar o array, removendo a música que for igual a música atual (vai desfavoritar a música)
          this.favoritos = this.favoritos.filter((posicaoMusica: number) => JSON.stringify(posicaoMusica) !== JSON.stringify(this.favoritos[i]));

          this.favorito_vazio = true;
          this.favorito_preenchido = false;
        }
      }
    }

    localStorage.setItem('Favoritos', JSON.stringify(this.favoritos));
  }

  // metódo para verificar se a música atual está nos favoritos
  // se estiver nos favoritos, o coração será preenchido
  verificarFavoritado() {
    this.favorito_vazio = true;
    this.favorito_preenchido = false;

    for (let i in this.favoritos) {
      if (JSON.stringify(this.musica) === JSON.stringify(this.favoritos[i])) { // "JSON.stringify()" para comparar objetos
        this.favorito_vazio = false;
        this.favorito_preenchido = true;
      }
    }
  }

  reproduzirMusica() {
    this.section = true;
    this.verificarFavoritado();
  }
}