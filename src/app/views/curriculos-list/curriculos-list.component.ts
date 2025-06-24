import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculoService } from 'src/app/services/curriculo.service';

@Component({
  selector: 'app-curriculos-list',
  templateUrl: './curriculos-list.component.html',
  styleUrls: ['./curriculos-list.component.scss']
})
export class CurriculosListComponent implements OnInit {
  curriculos: Curriculo[] = [];
  filtroNome = '';
  filtroId = '';

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.curriculoService.getCurriculos().subscribe({
      next: (dados) => (this.curriculos = dados),
      error: (erro) => console.error('Erro ao buscar currículos:', erro),
    });
  }

  get curriculosFiltrados(): Curriculo[] {
    return this.curriculos.filter(c => {
      const nomeOk = this.filtroNome === '' || c.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
      const idOk = this.filtroId === '' || c.id.toString().includes(this.filtroId);
      return nomeOk && idOk;
    });
  }
}
