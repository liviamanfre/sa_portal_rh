import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.model';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl = "http://localhost:3001/vagas"; // endereço da Api

  constructor(private http: HttpClient ) { }


  //criar os métodos para conexão com a apiREST

  //get - obter a lista de vagas
  getVagas():Observable<Vaga[]> { //observable -> rxjs => tradutor de Json -> typescript
    return this.http.get<Vaga[]>(this.apiUrl); //conecta com a API para pegar os Dados
  }

  //post
  postVagas(Vaga:Vaga): Observable<Vaga[]>{
    return this.http.post<Vaga[]>(this.apiUrl,Vaga);
    // Observable -> rxjs => tradutor de json
  }

  //put
  // nomeDoMétodo(parâmeetros)
  putVaga(id: any, vaga:Vaga): Observable<Vaga[]> { // coleção chave -> valor
    // http://localhost:3001/vagas/XXXXX
    const url = `${this.apiUrl}/${id}`; //construir a url join(apiUrl+id)
    return this.http.put<Vaga[]>(url, vaga);
  }

  //delete
  deleteVaga(id:any): Observable<Vaga[]>{
    const url = this.apiUrl+"/"+id;
    return this.http.delete<Vaga[]>(url);
  }
}
