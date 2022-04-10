import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { BuscarComponent } from '../buscar/buscar.component';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})

export class PlayerCardComponent implements OnInit {

  @ViewChild('texto', { static: false }) texto!: ElementRef;
  @ViewChild('player', { static: false }) player!: ElementRef;
  @ViewChild('favorito_vazio', { static: false }) favorito_vazio!: ElementRef;
  @ViewChild('favorito_preenchido', { static: false }) favorito_preenchido!: ElementRef;

  static favoritado = new EventEmitter<any>();

  musica: any;
  favoritos: any;

  constructor() {
    this.musica = {};
    this.favoritos = [];
  }

  ngOnInit(): void {
    BuscarComponent.novaMusica.subscribe(
      musica => {
        this.musica = musica;
        this.reproduzirMusica();
      }
    );
  }

  reproduzirMusica() {
    this.player.nativeElement.style.display = 'grid';
    this.verificarFavoritado();
  }

  verificarFavoritado() {
    this.favorito_vazio.nativeElement.style.display = 'block';
    this.favorito_preenchido.nativeElement.style.display = 'none';

    for (let i in this.favoritos) {
      if (JSON.stringify(this.musica) === JSON.stringify(this.favoritos[i])) {
        this.favorito_vazio.nativeElement.style.display = 'none';
        this.favorito_preenchido.nativeElement.style.display = 'block';
      }
    }
  }


  favoritar() {
    PlayerCardComponent.favoritado.emit(this.musica);
    localStorage.removeItem('Favoritos');

    this.favoritos.push(this.musica);
    let cont: number = 0;

    for (let i in this.favoritos) {

      if (JSON.stringify(this.musica) === JSON.stringify(this.favoritos[i])) {
        cont += 1
        this.favorito_vazio.nativeElement.style.display = 'none';
        this.favorito_preenchido.nativeElement.style.display = 'block'

        if (cont > 1) {
          cont = 0;

          this.favoritos = this.favoritos.filter((posicaoMusica: any) => {
            return JSON.stringify(posicaoMusica) !== JSON.stringify(this.favoritos[i])
          })

          this.favorito_vazio.nativeElement.style.display = 'block';
          this.favorito_preenchido.nativeElement.style.display = 'none';
        }
      }
    }

    localStorage.setItem('Favoritos', JSON.stringify(this.favoritos));
  }
}