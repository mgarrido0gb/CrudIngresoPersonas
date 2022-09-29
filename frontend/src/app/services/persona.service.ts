import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment} from 'src/environments/environment';
import { Persona } from '../interfaces/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl:string;
  private myApiURL:string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiURL = 'api/personas/'
  }

  getPersonas() : Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiURL}`)
  }

  deletePersona(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiURL}${id}`);
  }

  addPersona(persona:Persona):Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiURL}`,persona);
  }

  getPersona(id: number) :Observable<Persona>{
    return this.http.get<Persona>(`${this.myAppUrl}${this.myApiURL}${id}`)
  }

  updatePersona(id : number , persona:Persona):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiURL}${id}`,persona);
  }
}
