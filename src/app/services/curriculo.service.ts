import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {
  private apiUrl = "http://localhost:3001/curriculos"; // endereço da Api
  constructor(private http: HttpClient) {
    
  }
  //criar os métodos para conexão com a apiREST
  //get - obter a lista de curriculos
  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl); //conecta com a API para pegar os Dados
  }

  //post
  postCurriculos(Curriculo:Curriculo): Observable<Curriculo[]>{
    return this.http.post<Curriculo[]>(this.apiUrl,Curriculo);
    // Observable -> rxjs => tradutor de json
  }

  //put
  // nomeDoMétodo(parâmeetros)
  putCurriculo(id: any, curriculo:Curriculo): Observable<Curriculo[]> { // coleção chave -> valor
    // http://localhost:3001/vagas/XXXXX
    const url = `${this.apiUrl}/${id}`; //construir a url join(apiUrl+id)
    return this.http.put<Curriculo[]>(url, curriculo);
  }

  //delete
  deleteCurriculo(id:any): Observable<Curriculo[]>{
    const url = this.apiUrl+"/"+id;
    return this.http.delete<Curriculo[]>(url);
  }
}