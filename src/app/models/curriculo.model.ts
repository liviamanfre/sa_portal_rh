export class Curriculo {
  constructor(
    public id: number,
    public nome: string,
    public idade: number,
    public linkedin: string,
    public github: string,
    public experiencia: string
  ) {}

  // Conversão de objetos
  // OBJ to JSON
  public toMap():{[key:string]: any}{
    return {
      id: this.id,
      nome: this.nome,
      idade: this.idade,
      linkedin: this.linkedin,
      github: this.github,
      experiencia: this.experiencia
    }
  }

  // JSON to OBJ
  static fromMap(map:any): Curriculo{
    return new Curriculo(
      map.id,
      map.nome,
      map.idade,
      map.linkedin,
      map.github,
      map.experiencia
    )
  }
}
