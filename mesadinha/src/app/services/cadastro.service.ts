import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(nome: string, email: string,   senha: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
   }
   nome: string;
   email: string;
   senha: string;
}
