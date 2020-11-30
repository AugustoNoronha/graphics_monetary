import { Lancamentos } from './../components/lancamento/lancamentos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  baseUrl= 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  public getlancamentos(): Observable<Lancamentos[]> {
    return this.http.get<Lancamentos[]>(`${this.baseUrl}/lancamentos`);
  }

  public postLancamentos(body: Lancamentos): Observable<Lancamentos> {
    return this.http.post<Lancamentos>(`${this.baseUrl}/lancamentos`, body);
  }
  public delete(id: number): Observable<Lancamentos> {
    const url =`${this.baseUrl}/lancamentos/${id}` 
    return this.http.delete<Lancamentos>(url)
  }
}
