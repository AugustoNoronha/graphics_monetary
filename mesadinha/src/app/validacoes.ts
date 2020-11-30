import { AbstractControl } from '../../node_modules/@angular/forms'
export class Validacoes {
  static SenhasCombinam(controle: AbstractControl) {
    let senha = controle.get('senha').value;
    let confirmarSenha = controle.get('confirmarSenha').value;

    if (senha === confirmarSenha) return null;

    controle.get('confirmarSenha').setErrors({ senhasNaoCoincidem: true });
  }
}