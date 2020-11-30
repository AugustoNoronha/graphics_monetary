import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { LoginComponent } from './components/login/login.component';
import { GraficosComponent } from './graficos/graficos.component';

const routes: Routes = [
  {
    path:"cadastrar", component:CadastroComponent
  },
  {
    path:"", component:LoginComponent
  },
 {
   path:"lancamento",component:LancamentoComponent
 },
 {
   path:"graficos",component:GraficosComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
