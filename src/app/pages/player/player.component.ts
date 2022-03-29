import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @ViewChild('inicio', { static: false }) inicio!: ElementRef;
  @ViewChild('buscar', { static: false }) buscar!: ElementRef;
  @ViewChild('playlists', { static: false }) playlists!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  // chamar essa função depois de sair da tela de login

  selecionarInicio() {
    this.inicio.nativeElement.classList.add('selecionado')
    this.buscar.nativeElement.classList.remove('selecionado')
    this.playlists.nativeElement.classList.remove('selecionado')
  }

  selecionarBuscar() {
    this.inicio.nativeElement.classList.remove('selecionado')
    this.buscar.nativeElement.classList.add('selecionado')
    this.playlists.nativeElement.classList.remove('selecionado')
  }

  selecionarPlaylists() {
    this.inicio.nativeElement.classList.remove('selecionado')
    this.buscar.nativeElement.classList.remove('selecionado')
    this.playlists.nativeElement.classList.add('selecionado')
  }

}
