import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HEROES } from './mock-heros';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  fetchHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetchHeroes');
    return of(HEROES);
  }
}
