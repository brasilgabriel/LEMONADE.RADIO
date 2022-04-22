import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MusicasService } from 'src/app/services/musicas.service';
import { BuscarComponent } from '../buscar/buscar.component';
import { InicioComponent } from '../inicio/inicio.component';

@Component({
  selector: 'app-resultado-musicas',
  templateUrl: 'resultado-musicas.component.html',
  styleUrls: ['resultado-musicas.component.scss']
})
export class ResultadoMusicasComponent implements OnInit {

  // para emitir novos eventos
  static mostrarMensagem = new EventEmitter<boolean>();
  static esconderHistorico = new EventEmitter<void>();
  static novaMusica = new EventEmitter<any>();

  arrayAPI: any;
  arrayMusicas: any;
  historico: any;
  section_loading: boolean = false;
  section_musicas: boolean = false;
  inicio: boolean = false;
  buscar: boolean = false;
  nome_artista: string = '';

  constructor(private musicasService: MusicasService) {
    this.arrayAPI = [];
    this.arrayMusicas = [];
    this.historico = JSON.parse(localStorage.getItem('Histórico') as any) || [];
  }

  ngOnInit(): void {
    BuscarComponent.buscarMusicas.subscribe(valor => {
      this.buscar = true;
      this.loading(valor)
    });

    InicioComponent.buscarMusicas.subscribe(valor => {
      this.inicio = true;
      this.nome_artista = valor;
      this.loading(valor)
    });
  }

  reproduzirMusica(musica: number) {
    localStorage.removeItem('Histórico');
    this.historico.push(this.arrayMusicas[musica]);

    let cont: number = 0;

    for (let i in this.historico) {
      if (JSON.stringify(this.arrayMusicas[musica]) === JSON.stringify(this.historico[i])) { // para ver se a música atual já existe no histórico
        cont += 1

        if (cont > 1) {
          cont = 0;
          this.historico.splice(i, 1); // se já existir, a música atual será removida para não ficar com músicas repetidas
        }
      }
    }

    localStorage.setItem('Histórico', JSON.stringify(this.historico));
    ResultadoMusicasComponent.novaMusica.emit(this.arrayMusicas[musica]);
  }

  tratarDuracao(duracao: number) {
    return (duracao / 60).toFixed(2).toString().replace('.', ':');
  }

  // para mostrar o resultado da pesquisa 
  manipularDOM() {
    if (this.arrayMusicas.length > 0) {
      this.section_musicas = true;
      this.section_loading = false;

    } else {
      ResultadoMusicasComponent.mostrarMensagem.emit(true);
      this.section_loading = false;
      this.section_musicas = false;
    }
  }

  // metódo para chamar a API
  buscarMusicas(valor: string) {
    this.musicasService.buscarMusicas(valor).subscribe(
      musicas => {
        this.arrayAPI = musicas;
        this.arrayMusicas = this.arrayAPI.data;
        this.manipularDOM();
      }
    )
  }

  loading(valor: string) {
    this.arrayMusicas = [];

    // como o elemento HTML está em outro componente, não é possível manipular a DOM por aqui, então tive que emitir um evento para manipular no outro componente
    ResultadoMusicasComponent.esconderHistorico.emit();
    this.section_loading = true;

    this.buscarMusicas(valor);
  }
}
