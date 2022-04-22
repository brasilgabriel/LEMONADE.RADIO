import { Component, EventEmitter, OnInit } from '@angular/core';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // para emitir novos eventos
  static novaMusica = new EventEmitter<any>();
  static buscarMusicas = new EventEmitter<string>();

  arrayAPI: any = [];
  arrayArtistas: any;
  recomendados: any = [];
  lancamentos: any = [];
  rockAntigas: any = [];
  section_inicio: boolean = true;

  constructor(private musicasService: MusicasService) {
    this.arrayArtistas = [ // preferi fazer assim pois a API só da a opção de buscar
      'Kendrick Lamar',
      'Billie Eilish',
      'Olivia Rodrigo',
      'Arctic Monkeys',
      'The Weeknd',

      'As It Was',
      'family ties',
      'good 4 u',
      'Black Summer',
      'Bones',

      'Pink Floyd',
      'The Beatles',
      'KISS',
      'Red Hot Chili Peppers',
      'Queen'
    ]
  }

  ngOnInit(): void {
    this.buscarInformacoes();
  }

  // metódo para buscar artistas/músicas já escolhidos por mim para usá-los na tela de início
  buscarInformacoes() {
    let i = 0; // para saber em qual artista está e de qual gênero é

    // objetos separados para cada gênero
    this.arrayArtistas.forEach((artistas: any) => {

      if (i < 5) { // rap
        this.musicasService.buscarMusicas(artistas).subscribe(
          valor => {
            this.arrayAPI = valor;
            this.recomendados.push(this.arrayAPI.data[0].artist);
          });

      } else if (i >= 5 && i < 10) { // rock
        this.musicasService.buscarMusicas(artistas).subscribe(
          valor => {
            this.arrayAPI = valor;
            this.lancamentos.push(this.arrayAPI.data[0]);
          });

      } else if (i >= 10) { // pop
        this.musicasService.buscarMusicas(artistas).subscribe(
          valor => {
            this.arrayAPI = valor;
            this.rockAntigas.push(this.arrayAPI.data[0]);
          });
      }

      i = i + 1;
    });
  }

  reproduzirMusica(musica: any) {
    InicioComponent.novaMusica.emit(musica);
  }

  buscarMusicas(valor: string) {
    this.section_inicio = false;
    InicioComponent.buscarMusicas.emit(valor);
  }
}
