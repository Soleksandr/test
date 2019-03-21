import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HEROES } from './mock-heros';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://api.jsonbin.io/b';
  private key = '$2a$10$eRBPJYa4xJz7w1uABhplQuOf7AgLaR1hhWxs/kwK30r9BundpXWNq';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'collection-id': '5c9393759c83133c0279bbb6',
    'secret-key': this.key
  });

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private errorHandler<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of (result as T);
    };
  }

  constructor(private messageService: MessageService, private http: HttpClient) {
    this.http.post<any>(this.heroesUrl, { name, id: 10 }, { headers: this.headers })
   }

  fetchHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetchHeroes');
    return this.http.get<Hero[]>(this.heroesUrl, { headers: this.headers }).pipe(
      catchError(this.errorHandler<Hero[]>('getHeroes', []))
    );
  }

  fetchHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetchHero');
    return of(HEROES.find(hero => hero.id === id));
  }

  createHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, { name, id: 10 }, { headers: this.headers }).pipe(
      catchError(this.errorHandler<Hero>('createHero'))
    );
  }
}
