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
  historico: any = [];

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
    this.historico = JSON.parse(localStorage.getItem('Histórico') as any);
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
    localStorage.removeItem('Histórico');
    this.historico.push(musica);

    let cont: number = 0;

    for (let i in this.historico) {
      if (JSON.stringify(musica) === JSON.stringify(this.historico[i])) { // para ver se a música atual já existe no histórico
        cont += 1

        if (cont > 1) {
          cont = 0;
          this.historico.splice(i, 1); // se já existir, a música atual será removida para não ficar com músicas repetidas
        }
      }
    }

    localStorage.setItem('Histórico', JSON.stringify(this.historico));
    InicioComponent.novaMusica.emit(musica);
  }

  buscarMusicas(valor: string) {
    this.section_inicio = false;
    InicioComponent.buscarMusicas.emit(valor);
  }
}
