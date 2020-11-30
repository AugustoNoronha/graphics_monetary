import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validacoes } from '../../validacoes';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formularioDeUsuario:FormGroup;

  constructor(private routerLink: Router,private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormularioUsuario();
  }

  enviarDados() {
    console.log(this.formularioDeUsuario.value);
  }

  criarFormularioUsuario(){
    this.formularioDeUsuario = this.FormBuilder.group({
      nome: [
        '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
    ],
      email: ['',Validators.compose([Validators.email])],
      senha: ['',Validators.compose([Validators.required])],
      confirmarSenha: ['',Validators.compose([Validators.required])]
    },
    {
      validator:Validacoes.SenhasCombinam
    });
  }

  login(){
    this.routerLink.navigate(['/'])
  }
}

