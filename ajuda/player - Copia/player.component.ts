import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

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
