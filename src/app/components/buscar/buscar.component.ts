import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { PlayerComponent } from 'src/app/pages/player/player.component';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})

export class BuscarComponent implements OnInit {

  @ViewChild('section_loading', { static: false }) section_loading!: ElementRef;
  @ViewChild('section_musicas', { static: false }) section_musicas!: ElementRef;

  static mostrarMensagem = new EventEmitter<string>();
  static esconderHistorico = new EventEmitter<void>();
  static novaMusica = new EventEmitter<any>();

  valor_input: string;
  arrayAPI: any;
  objMusicas: any;
  arrayMusicas: any;
  historico: any;

  constructor(private musicasService: MusicasService) {
    this.valor_input = '';
    this.arrayAPI = [];
    this.objMusicas = {};
    this.arrayMusicas = [];
    this.historico = JSON.parse(localStorage.getItem('Histórico') as any) || [];
  }

  ngOnInit(): void {
  }

  loading() {
    this.arrayMusicas = [];

    BuscarComponent.esconderHistorico.emit();
    this.section_loading.nativeElement.style.display = 'flex';

    this.buscarMusicas(this.valor_input);
  }

  manipularDOM() {
    if (this.arrayMusicas.length > 0) {
      this.section_musicas.nativeElement.style.display = 'flex';
      this.section_loading.nativeElement.style.display = 'none';

    } else {
      BuscarComponent.mostrarMensagem.emit('flex');
      this.section_loading.nativeElement.style.display = 'none';
      this.section_musicas.nativeElement.style.display = 'none';
    }
  }

  buscarMusicas(valor: string) {
    this.musicasService.buscarMusicas(valor).subscribe(
      musicas => {
        this.arrayAPI = musicas;
        this.objMusicas = this.arrayAPI.data;

        if (this.objMusicas !== undefined) {

          for (const musica of this.objMusicas) {
            const cardMusicas = {
              artista: musica.artist.name,
              nome_musica: musica.title,
              duracao_musica: (musica.duration / 60).toFixed(2).toString().replace('.', ':'),
              nome_album: musica.album.title,
              imagem_artista: musica.artist.picture_small,
              imagem_albumP: musica.album.cover_small,
              imagem_albumM: musica.album.cover_medium,
              preview: musica.preview
            }
            this.arrayMusicas.push(cardMusicas);
          }
        } else {
          BuscarComponent.mostrarMensagem.emit();
        }

        this.manipularDOM();
      }
    )
  }

  reproduzirMusica(musica: number) {
    this.section_musicas.nativeElement.style.marginBottom = '100px';

    const cardMusica = {
      artista: this.arrayMusicas[musica].artista,
      nome_musica: this.arrayMusicas[musica].nome_musica,
      duracao_musica: this.arrayMusicas[musica].duracao_musica,
      nome_album: this.arrayMusicas[musica].nome_album,
      imagem_artista: this.arrayMusicas[musica].imagem_artista,
      imagem_albumP: this.arrayMusicas[musica].imagem_albumP,
      imagem_albumM: this.arrayMusicas[musica].imagem_albumM,
      preview: this.arrayMusicas[musica].preview
    }

    localStorage.removeItem('Histórico');
    this.historico.push(cardMusica);

    let cont: number = 0;

    for (let i in this.historico) {
      if (JSON.stringify(cardMusica) === JSON.stringify(this.historico[i])) {
        cont += 1

        if (cont > 1) {
          cont = 0;
          this.historico.splice(i, 1);
        }
      }
    }

    localStorage.setItem('Histórico', JSON.stringify(this.historico));
    BuscarComponent.novaMusica.emit(cardMusica);
  }
}
