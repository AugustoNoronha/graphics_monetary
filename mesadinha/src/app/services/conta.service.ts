import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Lancamentos } from '../components/lancamento/lancamentos.model';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  baseUrl= 'http://localhost:3002';
  despesaSubject  = new ReplaySubject<any>(1);
  receitaSubject = new ReplaySubject<any>(1);
  saldoSubject = new ReplaySubject<any>(1);
  receita: number = 0;
  despesa : number = 0;
  saldo : number = 0;  

  constructor(private http: HttpClient) { }

  public getContas():Observable<any> {
    return this.http.get(`${this.baseUrl}/conta`).pipe(tap(res => {
      this.receita = res[0].receitas;
      this.receitaSubject.next(this.receita);
      this.despesa = res[0].despesa;
      this.despesaSubject.next(this.despesa);
      this.saldo = res[0].saldo;
      this.saldoSubject.next(this.saldo);
    }));    
  }

  public setDespesa(valor){
    this.despesaSubject.next(valor);
    this.despesa = valor;    
    this.putConta(); 
  }

  public setSaldo(valor){
    this.saldoSubject.next(valor);
    this.saldo = valor;    
    this.putConta(); 
  }

  public setReceita(valor){
    this.receitaSubject.next(valor);
    this.receita = valor;
    this.putConta()   
  }

  public getReceita():Observable<any>{
    return this.receitaSubject;
  }

  public getDespesas():Observable<any>{
    return this.despesaSubject;
  }

  public getSaldo():Observable<any>{
    return this.saldoSubject;
  }

  public putConta():Observable<any>{
   return this.http.put(`${this.baseUrl}/conta/1`,{saldo: this.saldo, receitas: this.receita, despesa: this.despesa})
  }  
}
