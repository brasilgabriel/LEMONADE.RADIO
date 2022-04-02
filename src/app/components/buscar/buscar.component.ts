import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { MusicasService } from 'src/app/services/musicas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})

export class BuscarComponent implements OnInit {

  @ViewChild('section_erro', { static: false }) section_erro!: ElementRef;
  @ViewChild('section_loading', { static: false }) section_loading!: ElementRef;
  @ViewChild('section_musicas', { static: false }) section_musicas!: ElementRef;

  static novaMusica = new EventEmitter<any>();

  frase: string;
  valor_input: string;
  arrayAPI: any;
  objMusicas: any;
  arrayMusicas: any;

  constructor(private musicasService: MusicasService) {
    this.frase = 'NENHUMA BUSCA RECENTE';
    this.valor_input = '';
    this.arrayAPI = [];
    this.objMusicas = {};
    this.arrayMusicas = [];
  }

  ngOnInit(): void {
  }

  loading() {

    this.arrayMusicas = [];
    this.section_erro.nativeElement.style.display = 'none';
    this.section_loading.nativeElement.style.display = 'flex';
    this.buscarMusicas(this.valor_input)
  }

  manipularDOM() {

    if (this.arrayMusicas.length > 0) {
      this.section_musicas.nativeElement.style.display = 'flex';
      this.section_loading.nativeElement.style.display = 'none';

    } else {
      this.section_erro.nativeElement.style.display = 'flex';
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
          this.frase = 'NENHUM RESULTADO ENCONTRADO'
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

    BuscarComponent.novaMusica.emit(cardMusica);
  }
}
