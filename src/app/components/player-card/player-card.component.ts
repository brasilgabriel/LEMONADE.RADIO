import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})

export class PlayerCardComponent implements OnInit {

  musicas: any;

  constructor() {
    this.musicas = [];
  }

  ngOnInit(): void {
  }

  receberMusica() {
    this.musicas = JSON.parse(localStorage.getItem('Músicas') as any);
    console.log(this.musicas);
  }
}
