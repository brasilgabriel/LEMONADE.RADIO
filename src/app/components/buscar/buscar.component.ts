import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})

export class BuscarComponent implements OnInit {

  // para emitir novos eventos
  static buscarMusicas = new EventEmitter<string>();

  valor_input: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  buscarMusicas(valor: string) {
    BuscarComponent.buscarMusicas.emit(valor);
  }
}