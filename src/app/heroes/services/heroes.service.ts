import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl = environment.baseUrl;
  url: string = `${this.baseUrl}/heroes`;
  constructor(private http: HttpClient) {}
  get httpParams() {
    return new HttpParams().set('fields', 'id');
  }
  getHeroes() {
    return this.http.get<Heroe[]>(this.url);
  }

  getHeroeById(id: string): Observable<Heroe> {
    const url = `${this.url}/${id}`;
    return this.http.get<Heroe>(url, { params: this.httpParams });
  }

  getSugerencias(termino: string):Observable<Heroe[]> {
    // http://localhost:3000/heroes?q=a&_limit=6
    return this.http.get<Heroe[]>(`${this.url}?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(this.url, heroe);
  }

  actualizarHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(this.url + `/${heroe.id}`,heroe);
  }

  
 borrarHeroe(id:string):Observable<any>{
    return this.http.delete<any>(this.url + `/${id}`);
  }


  
}
