import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss'],
})
export class PainelVagasComponent implements OnInit {
  //atributos
  public vaga: Vaga = new Vaga(0, '', '', '', 0);
  // rastrear os dados no formulário por interpolação{{}}
  public vagas: Vaga[] = []; // vetor para armazenar as vagas do banco de dados

  // construtor
  constructor(private _vagasService: VagasService) {}
  // aplicando o service no construtor

  // métodos onInit
  ngOnInit(): void {
    this.listarVagas()
  }

  // 4 métodos para o CRUD
  listarVagas(): void {
    this._vagasService.getVagas().subscribe(
      (e) => {
        this.vagas = e.map((vaga) => Vaga.fromMap(vaga));
      },
      (error) => {
        console.error('Erro ao listar vagas: ', error);
      }
    );
  }

  //Listar vaga por ID - READ
  listarVagaPorId(vaga: Vaga): void {
    // método para listar uma vaga no Formulário para Edição
    this.vaga = vaga;
    // a Vaga clicada é definida como a vaga atual no Formulário
  }


  // CREATE
  cadastrarVaga(): void {
    this._vagasService.postVagas(this.vaga).subscribe(
      () => {
        this.vaga = new Vaga(0, '', '', '', 0);
        this.listarVagas();
      },
      (error) => {
        console.error('Erro ao Cadastrar Vaga: ', error);
      }
    );
  }


  // UPDATE
  atualizarVaga(id: any): void {
    this._vagasService.putVaga(id, this.vaga).subscribe(
      () => {
        this.vaga = new Vaga(0, '', '', '', 0); // limpa o formulário
        this.listarVagas(); // lista as vagas novamente
      },
      (error) => {
        console.error('Erro ao Atualizar Vaga: ', error);
      }
    );
  }


  // DELETE
  excluirVaga(id: any): void {
    this._vagasService.deleteVaga(id).subscribe(
      () => {
        this.vaga = new Vaga(0, '', '', '', 0); // limpa o formulário
        this.listarVagas(); // lista as vagas novamente
      },
      (error) => {
        console.error('Erro ao Deletear Vaga: ', error);
      }
    );
  }
}
