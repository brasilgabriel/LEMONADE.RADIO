import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MusicasService {

  constructor(private http: HttpClient) { }

  buscarMusicas(valor: string): Observable<Object> {

    const urlAPI = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${valor}`;

    const headers = new HttpHeaders().set('X-RapidAPI-Host', 'deezerdevs-deezer.p.rapidapi.com')
      .set('X-RapidAPI-Key', '46a2224ba6msh030c63f1d0446e2p131d2fjsn2c4402b72d18');

    return this.http.get(urlAPI, { headers });
  }
}
