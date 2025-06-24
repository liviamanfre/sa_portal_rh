import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-curriculo-list',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss']
})
export class PainelCurriculosComponent implements OnInit {
  //atributos
  public curriculo: Curriculo = new Curriculo(0, '', 0, '', '', ''); // instância do Curriculo para rastrear os dados no formulário
  // rastrear os dados no formulário por interpolação{{}}
  public curriculos: Curriculo[] = []; // vetor para armazenar as curriculos do banco de dados

  // construtor
  constructor(private _curriculoService: CurriculoService) {}
  // aplicando o service no construtor

  // métodos onInit
  ngOnInit(): void {
    this.listarCurriculos()
  }

  listarCurriculos(): void {
    this._curriculoService.getCurriculos().subscribe(
      (e) => {
        this.curriculos = e.map((curriculo) => Curriculo.fromMap(curriculo));
      },
      (error) => {
        console.error('Erro ao listar curriculos: ', error);
      }
    );
  }

  //Listar vaga por ID - READ
  listarCurriculoPorId(curriculo: Curriculo): void {
    // método para listar uma vaga no Formulário para Edição
    this.curriculo = curriculo;
    // a Vaga clicada é definida como a curriculo atual no Formulário
  }


  // CREATE
  cadastrarCurriculo(): void {
    this._curriculoService.postCurriculos(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', 0, '', '', '');
        this.listarCurriculos();
      },
      (error) => {
        console.error('Erro ao Cadastrar Curriculo: ', error);
      }
    );
  }


  // UPDATE
  atualizarCurriculo(id: any): void {
    this._curriculoService.putCurriculo(id, this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', 0, '', '', ''); // limpa o formulário
        this.listarCurriculos(); // lista as curriculos novamente
      },
      (error) => {
        console.error('Erro ao Atualizar Curriculo: ', error);
      }
    );
  }


  // DELETE
  excluirCurriculo(id: any): void {
    this._curriculoService.deleteCurriculo(id).subscribe(
      () => {
        this.curriculo = new Curriculo(0, '', 0, '', '', ''); // limpa o formulário
        this.listarCurriculos(); // lista as curriculos novamente
      },
      (error) => {
        console.error('Erro ao Deletear Curriculo: ', error);
      }
    );
  }
}
