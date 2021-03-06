import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  static mostrarHistorico = new EventEmitter<void>();

  menuSelecionado: string;

  constructor(private router: Router) {
    this.menuSelecionado = 'inicio';
  }

  ngOnInit(): void {
    this.router.navigateByUrl(`/player/inicio`)
  }

  selecionarMenu(menu: string) {
    menu === 'buscar' ? PlayerComponent.mostrarHistorico.emit() : '';

    this.menuSelecionado = menu;
    this.router.navigateByUrl(`/player/${menu}`); // para navegar pelo site
  }
}
