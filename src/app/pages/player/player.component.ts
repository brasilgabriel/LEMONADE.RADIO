import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  menuSelecionado: string;
  teste: any;

  constructor(
    private router: Router
  ) {
    this.menuSelecionado = 'buscar'; // dps colocar inicio
    this.teste = [];
  }

  ngOnInit(): void {
    this.router.navigateByUrl(`/player/buscar`) // dps colocar inicio
  }

  selecionarMenu(menu: string) {
    this.menuSelecionado = menu;
    this.router.navigateByUrl(`/player/${menu}`);
  }
}
