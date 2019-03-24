import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { HEROES } from "./mock-heros";
import { Hero } from "./hero";
import { MessageService } from "./message.service";
import { httpClientInMemBackendServiceFactory } from "angular-in-memory-web-api";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private heroesUrl = "api/heroes";

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-type": "application/json"
    })
  };

  private errorHandler<T>(name: string, data?: T) {
    return (error: any) => {
      console.log(error);
      this.log(`${name} failed: ${error.message}`);
      return of(data);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  fetchHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log("fetchHeroes")),
      catchError(this.errorHandler<Hero[]>("fetchHeroes", []))
    );
  }

  fetchHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + "/" + id;

    return this.http.get<Hero>(url).pipe(
      tap(() => this.log("fetchHero")),
      catchError(this.errorHandler<Hero>("FetchHero"))
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => console.log("createHero")),
      catchError(this.errorHandler<Hero>("createHero"))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log("updateHero")),
      catchError(this.errorHandler<any>("update hero"))
    );
  }

  deleteHero(hero: Hero): Observable<any> {
    return this.http.delete<any>(
      this.heroesUrl + "/" + hero.id,
      this.httpOptions
    );
  }

  searchByName(name: string): Observable<Hero[]> {
    name = name.trim();

    if (!name) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`).pipe(
      tap(() => this.log("Search hero by id")),
      catchError(this.errorHandler<Hero[]>("searchHero", []))
    );
  }
}
