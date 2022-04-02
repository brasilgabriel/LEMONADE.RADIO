import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  musica: any;

  constructor() {
    this.musica = {};
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
    this.favorito_vazio.nativeElement.style.display = 'block';
    this.favorito_preenchido.nativeElement.style.display = 'none';
  }

  favoritar() {

    // validar dependendo se estiver na playlist de favoritos
    if (this.favorito_vazio.nativeElement.style.display === 'block') {
      this.favorito_vazio.nativeElement.style.display = 'none';
      this.favorito_preenchido.nativeElement.style.display = 'block';

    } else {
      this.favorito_vazio.nativeElement.style.display = 'block';
      this.favorito_preenchido.nativeElement.style.display = 'none';
    }
  }
}
