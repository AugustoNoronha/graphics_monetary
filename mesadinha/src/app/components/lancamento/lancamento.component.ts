import { ContaService } from './../../services/conta.service';
import { observable, Observable } from 'rxjs';
import { Lancamentos } from './lancamentos.model';
import { LancamentosService } from './../../services/lancamentos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
})
export class LancamentoComponent implements OnInit {

  dataSource;
  form: FormGroup;
  displayedColumns = ['id', 'nome', 'tipo', 'valor', 'data', 'action'];
  serviso = [];
  conta: any = {
    receitas: 0,
    saldo: 0,
    despesa: 0
  };

  constructor(
    private routerLink: Router,
    private lancamentosService: LancamentosService,
    private formBuilder: FormBuilder,
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    this.criarLancamentos();
    this.getLancamentos();
    this.getDadosConta();
  }


  lancamento() {
    this.routerLink.navigate(['/lancamento']);
  }

  graficos(){
  this.routerLink.navigate(['/graficos']);
}

  getLancamentos() {
    this.lancamentosService.getlancamentos().subscribe((response) => {
      this.serviso = response;
      this.dataSource = new MatTableDataSource<Lancamentos>(this.serviso);
    });
  }

  getDadosConta(){
    this.contaService.getContas().subscribe(()=>{
      this.contaService.getReceita().subscribe(res => {
        this.conta.receitas = res;
      })
      this.contaService.getDespesas().subscribe(res => {
        this.conta.despesa = res;
      })
      this.contaService.getSaldo().subscribe(res => {
        this.conta.saldo = res;
      })
    });
  }

  cadastrar() {
    if(this.form.value.tipo === 'Despesa'){     
      this.contaService.setDespesa(+this.conta.despesa + +this.form.value.valor)
      this.contaService.setSaldo(+this.conta.saldo - +this.form.value.valor)
    }else{
      this.contaService.setReceita(+this.conta.receitas + +this.form.value.valor)
      this.contaService.setSaldo(+this.conta.saldo + +this.form.value.valor)
    }
    this.lancamentosService
      .postLancamentos(this.form.value)
      .subscribe(() => {
        this.getLancamentos();
        this.contaService.putConta().subscribe();
      });
      }

  criarLancamentos() {
    this.form = this.formBuilder.group({
      id: '',
      tipo: '',
      nome: '',
      valor: '',
      data: '',
    });
  }

  deleteConta(id): void {
    if(this.form.value.tipo == 'Despesa'){     
      this.contaService.setDespesa(+this.conta.despesa - +this.form.value.valor)
      this.contaService.setSaldo(+this.conta.saldo + +this.form.value.valor)
    }else{
      this.contaService.setReceita(+this.conta.receitas - +this.form.value.valor)
      this.contaService.setSaldo(+this.conta.saldo - +this.form.value.valor)
    }
    this.lancamentosService.delete(id).subscribe(() => {
      this.getLancamentos();
      this.contaService.putConta().subscribe();
    });
  }
}
