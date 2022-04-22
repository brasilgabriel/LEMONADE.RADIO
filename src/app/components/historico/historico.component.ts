import { Component, OnInit } from '@angular/core';
import { ResultadoMusicasComponent } from '../resultado-musicas/resultado-musicas.component';
@Component({
  selector: 'app-historico',
  templateUrl: 'historico.component.html',
  styleUrls: ['historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  section_loading: boolean = false;
  section_mensagem: boolean = false;
  section_historico: boolean = false;

  frase: string;
  historico: any;

  constructor() {
    this.frase = 'NENHUMA REPRODUÇÃO RECENTE';
    this.historico = [];
  }

  ngOnInit(): void {
    setTimeout(() => { // se não tiver o setTimeout(), vai dar erro pois não é possível manipular a DOM assim que a página carrega
      this.historico = [];
      this.mostrarHistorico();
    }, 10);

    ResultadoMusicasComponent.mostrarMensagem.subscribe((boolean: boolean) => { this.mostrarMensagem(boolean) });
    ResultadoMusicasComponent.esconderHistorico.subscribe(() => { this.esconderHistorico() });
  }

  mostrarMensagem(boolean: boolean) {
    this.frase = 'NENHUM RESULTADO ENCONTRADO';
    boolean === true ? this.section_mensagem = true : '';
  }

  esconderHistorico() {
    this.section_mensagem = false;
    this.section_historico = false;
  }

  mostrarHistorico() {
    JSON.parse(localStorage.getItem('Histórico') as any) !== null ? this.historico = JSON.parse(localStorage.getItem('Histórico') as any) : '';

    this.section_loading = false;
    this.section_historico = false;
    this.section_mensagem = true;

    if (this.historico.length > 0) {
      this.section_loading = false;
      this.section_mensagem = false;
      this.section_historico = true;
    }
  }

  excluirMusicaHistorico(musica: any) {
    localStorage.removeItem('Histórico');

    this.historico.splice(musica, 1);

    localStorage.setItem('Histórico', JSON.stringify(this.historico));

    this.mostrarHistorico()
  }
}
