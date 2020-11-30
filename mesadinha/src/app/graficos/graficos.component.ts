import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ContaService } from '../services/conta.service';
import { LancamentosService } from '../services/lancamentos.service';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  
  constructor(private routerLink: Router,
    private lancamentosService: LancamentosService,
    private formBuilder: FormBuilder,
    private contaService: ContaService) { }

    dataSource;
    form: FormGroup;
    serviso = [];
    conta: any = {
      receitas: 0,
      saldo: 0,
      despesa: 0
    }


    
  ngOnInit() {
    this.getLancamentos();
    this.getDadosConta();

  }

  



  lancamento() {
    this.routerLink.navigate(['/lancamento']);
  }

  graficos() {
    this.routerLink.navigate(['/graficos']);
  }

  getLancamentos() {
    this.lancamentosService.getlancamentos().subscribe((response) => {
      this.serviso = response;

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
        this.show();
      })
    });
  }


      @ViewChild("meuCanvas", { static: true }) elemento: ElementRef
      show(){
        console.log(this.conta.saldo)
        var meuCanva = new Chart(this.elemento.nativeElement, {
          type: 'bar',
          data: {
              labels: ['Receita', 'Despesa', 'Saldo', ],
              datasets: [{
              
                 
                  data: [ this.conta.receitas,  this.conta.despesa ,this.conta.saldo,],
                  backgroundColor: [
                      'rgba(0, 128, 0, 0.6)',
                      'rgba(190, 24, 24, 0.6)',
                      'rgba(255, 215, 0, 0.6)'
                      
                  ],
                  borderColor: [
                      'rgba(0, 128, 0, 1)',
                      'rgba(190, 24, 24, 1)',
                      'rgba(255, 215, 0, 0.8)'
                  
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            animation:true,
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
      }
    

 


}
