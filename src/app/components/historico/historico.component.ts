import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { PlayerComponent } from 'src/app/pages/player/player.component';
import { BuscarComponent } from '../buscar/buscar.component';

@Component({
  selector: 'app-historico',
  templateUrl: 'historico.component.html',
  styleUrls: ['historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  @ViewChild('section_loading', { static: false }) section_loading!: ElementRef;
  @ViewChild('section_mensagem', { static: false }) section_mensagem!: ElementRef;
  @ViewChild('section_historico', { static: false }) section_historico!: ElementRef;

  frase: string;
  historico: any;

  constructor() {
    this.frase = 'NENHUMA REPRODUÇÃO RECENTE';
    this.historico = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.historico = [];
      this.mostrarHistorico();
    }, 10);

    BuscarComponent.mostrarMensagem.subscribe((display: string) => { this.mostrarMensagem(display) });
    BuscarComponent.esconderHistorico.subscribe(() => { this.esconderHistorico() });
  }

  mostrarHistorico() {
    this.historico = JSON.parse(localStorage.getItem('Histórico') as any);

    switch (this.historico !== null) {

      case true:
        if (this.historico.length > 0) {
          this.section_loading.nativeElement.style.display = 'none';
          this.section_mensagem.nativeElement.style.display = 'none';
          this.section_historico.nativeElement.style.display = 'flex';

        } else {
          this.section_loading.nativeElement.style.display = 'none';
          this.section_historico.nativeElement.style.display = 'none';
          this.section_mensagem.nativeElement.style.display = 'flex';
        }
        break;

      case false:
        this.section_loading.nativeElement.style.display = 'none';
        this.section_historico.nativeElement.style.display = 'none';
        this.section_mensagem.nativeElement.style.display = 'flex';
        break
    }
  }

  mostrarMensagem(display: string) {
    this.frase = 'NENHUM RESULTADO ENCONTRADO';

    if (display === 'flex') {
      this.section_mensagem.nativeElement.style.display = 'flex';
    }
  }

  esconderHistorico() {
    this.section_mensagem.nativeElement.style.display = 'none';
    this.section_historico.nativeElement.style.display = 'none';
  }

  excluirMusicaHistorico(musica: any) {
    localStorage.removeItem('Histórico');

    this.historico.splice(musica, 1);

    localStorage.setItem('Histórico', JSON.stringify(this.historico));

    this.mostrarHistorico()
  }
}
