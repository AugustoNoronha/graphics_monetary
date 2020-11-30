
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin:FormGroup;

  constructor(private routerlink: Router,
    private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormularioUsuario();
  }

  cadastro(){
    this.routerlink.navigate(['/cadastrar'])
  }

  lancamento(){
    this.routerlink.navigate(["/lancamento"])
  }

  criarFormularioUsuario(){
    this.formularioLogin = this.FormBuilder.group({
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
    );
  }
}
